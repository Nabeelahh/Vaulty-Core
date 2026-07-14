import * as StellarSdk from 'stellar-sdk';
import { config } from '../../config';

export class StellarClient {
  private server: StellarSdk.Horizon.Server;
  private network: string;

  constructor() {
    this.network = config.stellar.network;
    const horizonUrl = config.stellar.horizonUrl;
    this.server = new StellarSdk.Horizon.Server(horizonUrl);
  }

  /**
   * Create a new Stellar wallet
   * @returns The public and secret key pair
   */
  async createWallet(): Promise<{ publicKey: string; secretKey: string }> {
    const pair = StellarSdk.Keypair.random();
    return {
      publicKey: pair.publicKey(),
      secretKey: pair.secret(),
    };
  }

  /**
   * Get account balance
   * @param publicKey The Stellar public key
   * @returns The account balance
   */
  async getBalance(publicKey: string): Promise<string> {
    try {
      const account = await this.server.loadAccount(publicKey);
      const balance = account.balances.find((b: any) => b.asset_type === 'native');
      return balance ? balance.balance : '0';
    } catch (error) {
      throw new Error(`Failed to get balance for account ${publicKey}`);
    }
  }

  /**
   * Get account details
   * @param publicKey The Stellar public key
   * @returns Account details
   */
  async getAccount(publicKey: string): Promise<any> {
    try {
      return await this.server.loadAccount(publicKey);
    } catch (error) {
      throw new Error(`Failed to load account ${publicKey}`);
    }
  }

  /**
   * Fund a testnet account with friendbot
   * @param publicKey The Stellar public key
   * @returns Success status
   */
  async fundTestnetAccount(publicKey: string): Promise<boolean> {
    if (this.network !== 'testnet') {
      throw new Error('Friendbot is only available on testnet');
    }

    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fund account');
      }
      return true;
    } catch (error) {
      throw new Error(`Failed to fund testnet account: ${error}`);
    }
  }

  /**
   * Submit a transaction to the Stellar network
   * @param transactionXDR The signed transaction in XDR format
   * @returns Transaction result
   */
  async submitTransaction(transactionXDR: string): Promise<any> {
    try {
      const transaction = StellarSdk.TransactionBuilder.fromXDR(
        transactionXDR,
        this.getNetworkPassphrase()
      );
      const result = await this.server.submitTransaction(transaction);
      return result;
    } catch (error) {
      throw new Error(`Failed to submit transaction: ${error}`);
    }
  }

  /**
   * Get transaction status
   * @param transactionHash The transaction hash
   * @returns Transaction details
   */
  async getTransaction(transactionHash: string): Promise<any> {
    try {
      return await this.server.transactions().transaction(transactionHash).call();
    } catch (error) {
      throw new Error(`Failed to get transaction ${transactionHash}`);
    }
  }

  /**
   * Get the network passphrase for signing transactions
   * @returns Network passphrase
   */
  private getNetworkPassphrase(): string {
    return this.network === 'mainnet'
      ? StellarSdk.Networks.PUBLIC
      : StellarSdk.Networks.TESTNET;
  }

  /**
   * Build a payment transaction
   * @param sourcePublicKey The source account public key
   * @param destinationPublicKey The destination account public key
   * @param amount The amount to send (in XLM)
   * @param memo Optional memo
   * @returns Unsigned transaction XDR
   */
  async buildPaymentTransaction(
    sourcePublicKey: string,
    destinationPublicKey: string,
    amount: string,
    memo?: string
  ): Promise<string> {
    try {
      const sourceAccount = await this.server.loadAccount(sourcePublicKey);
      const fee = await this.server.fetchBaseFee();
      
      let builder = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: fee.toString(),
        networkPassphrase: this.getNetworkPassphrase(),
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationPublicKey,
            asset: StellarSdk.Asset.native(),
            amount: amount,
          })
        )
        .setTimeout(30);

      if (memo) {
        builder = builder.addMemo(StellarSdk.Memo.text(memo));
      }

      const transaction = builder.build();
      return transaction.toXDR();
    } catch (error) {
      throw new Error(`Failed to build payment transaction: ${error}`);
    }
  }
}

// Export singleton instance
export const stellarClient = new StellarClient();
