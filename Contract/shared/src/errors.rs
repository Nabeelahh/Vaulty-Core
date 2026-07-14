use soroban_sdk::contracterror;

/// Shared error codes used across all Vaulty contracts
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    /// Unauthorized caller - the invoker lacks required permissions
    Unauthorized = 1,

    /// Vault not found - the specified vault does not exist
    VaultNotFound = 2,

    /// Invalid amount - amount must be positive
    InvalidAmount = 3,

    /// Insufficient balance - not enough funds for the operation
    InsufficientBalance = 4,

    /// Vault locked - operation not allowed during lock period
    VaultLocked = 5,

    /// Invalid lock period - lock period must be within allowed bounds
    InvalidLockPeriod = 6,

    /// Overflow in arithmetic operation
    Overflow = 7,

    /// Underflow in arithmetic operation
    Underflow = 8,

    /// Invalid asset - asset not supported by the protocol
    InvalidAsset = 9,

    /// Already initialized - contract or vault already initialized
    AlreadyInitialized = 10,

    /// Not initialized - contract or vault not yet initialized
    NotInitialized = 11,

    /// Invalid timestamp - timestamp is invalid or in the past
    InvalidTimestamp = 12,

    /// Streak not found - the specified streak does not exist
    StreakNotFound = 13,

    /// Loan not found - the specified loan does not exist
    LoanNotFound = 14,

    /// Insufficient collateral - not enough collateral for loan
    InsufficientCollateral = 15,

    /// Liquidation threshold reached - position must be liquidated
    LiquidationThreshold = 16,

    /// Reward already claimed - reward already claimed by user
    RewardAlreadyClaimed = 17,

    /// Invalid parameters - provided parameters are invalid
    InvalidParameters = 18,
}
