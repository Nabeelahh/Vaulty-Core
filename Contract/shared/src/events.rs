use soroban_sdk::{Address, BytesN};

/// Event emitted when a new vault is created
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct VaultCreated {
    pub vault_id: BytesN<32>,
    pub owner: Address,
    pub asset: BytesN<32>,
    pub lock_period: u64,
}

/// Event emitted when a deposit is made to a vault
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DepositMade {
    pub vault_id: BytesN<32>,
    pub depositor: Address,
    pub amount: i128,
}

/// Event emitted when a withdrawal is completed
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct WithdrawalCompleted {
    pub vault_id: BytesN<32>,
    pub withdrawer: Address,
    pub amount: i128,
}

/// Event emitted when a vault is unlocked after lock period
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct VaultUnlocked {
    pub vault_id: BytesN<32>,
    pub unlock_time: u64,
}

/// Event emitted when a user's streak is updated
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StreakUpdated {
    pub user: Address,
    pub streak_count: u32,
    pub last_activity: u64,
}

/// Event emitted when a loan is issued
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LoanIssued {
    pub loan_id: BytesN<32>,
    pub borrower: Address,
    pub amount: i128,
    pub collateral: i128,
}

/// Event emitted when a loan is repaid
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LoanRepaid {
    pub loan_id: BytesN<32>,
    pub borrower: Address,
    pub amount_repaid: i128,
}

/// Event emitted when a reward is granted to a user
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RewardGranted {
    pub recipient: Address,
    pub reward_amount: i128,
    pub reward_type: u32,
}
