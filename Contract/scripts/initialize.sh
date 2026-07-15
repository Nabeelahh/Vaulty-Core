#!/bin/bash
set -euo pipefail

# Initialize script for Vaulty smart contracts
# Calls each contract's initialization entry point after deployment

# Load configuration from environment variables
NETWORK="${NETWORK:-testnet}"
SOURCE_ACCOUNT="${SOURCE_ACCOUNT:-}"
CONTRACTS_DIR="${CONTRACTS_DIR:-target/wasm}"

# Validate network
if [[ "$NETWORK" != "testnet" && "$NETWORK" != "mainnet" ]]; then
    echo "Error: NETWORK must be 'testnet' or 'mainnet'"
    exit 1
fi

# Check if source account is provided
if [ -z "$SOURCE_ACCOUNT" ]; then
    echo "Error: SOURCE_ACCOUNT environment variable must be set"
    exit 1
fi

echo "Initializing Vaulty contracts on $NETWORK..."

# Function to initialize a contract
initialize_contract() {
    local contract_name=$1
    local contract_id_file="$CONTRACTS_DIR/${contract_name}_id.txt"
    
    if [ ! -f "$contract_id_file" ]; then
        echo "Warning: Contract ID file not found for $contract_name, skipping"
        return
    fi
    
    local contract_id=$(cat "$contract_id_file")
    
    echo "Initializing $contract_name (ID: $contract_id)..."
    
    # Initialize based on contract type
    case "$contract_name" in
        vault)
            # Vault contract doesn't require global initialization
            echo "Vault contract: No global initialization required"
            ;;
        streaks)
            # TODO: Add streaks initialization parameters
            echo "Streaks contract: TODO - Add initialization parameters"
            ;;
        lending)
            # TODO: Add lending initialization parameters
            echo "Lending contract: TODO - Add initialization parameters"
            ;;
        borrowing)
            # TODO: Add borrowing initialization parameters
            echo "Borrowing contract: TODO - Add initialization parameters"
            ;;
        rewards)
            # TODO: Add rewards initialization parameters
            stellar contract invoke \
                --id "$contract_id" \
                --source "$SOURCE_ACCOUNT" \
                --network "$NETWORK" \
                -- initialize_rewards \
                --total_pool 1000000000 \
                --reward_asset "TODO_ASSET_CODE"
            echo "Rewards contract initialized"
            ;;
        *)
            echo "Unknown contract: $contract_name"
            ;;
    esac
}

# Initialize each contract
initialize_contract "vault"
initialize_contract "streaks"
initialize_contract "lending"
initialize_contract "borrowing"
initialize_contract "rewards"

echo "Initialization complete"
