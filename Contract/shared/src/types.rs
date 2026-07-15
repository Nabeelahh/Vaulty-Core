use soroban_sdk::{contracttype, Address, BytesN};

/// Vault status enum representing the current state of a vault
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
#[contracttype]
#[repr(u32)]
pub enum VaultStatus {
    Active = 0,
    Locked = 1,
    Unlocked = 2,
    Closed = 3,
}

/// Asset identifier for supported tokens in the protocol
#[derive(Clone, Debug, PartialEq, Eq)]
#[contracttype]
pub struct Asset {
    pub code: BytesN<32>,
    pub issuer: Option<Address>,
}

/// Vault metadata containing lock period and other configuration
#[derive(Clone, Debug, PartialEq, Eq)]
#[contracttype]
pub struct VaultMetadata {
    pub owner: Address,
    pub asset: Asset,
    pub lock_period: u64, // in seconds
    pub created_at: u64,
    pub unlock_time: u64,
    pub status: VaultStatus,
}

/// Amount wrapper for safe arithmetic operations
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Amount {
    pub value: i128,
}

impl Amount {
    pub const fn new(value: i128) -> Self {
        Self { value }
    }

    pub fn checked_add(self, other: Amount) -> Option<Amount> {
        self.value.checked_add(other.value).map(Amount::new)
    }

    pub fn checked_sub(self, other: Amount) -> Option<Amount> {
        self.value.checked_sub(other.value).map(Amount::new)
    }
}
