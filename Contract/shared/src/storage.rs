use soroban_sdk::{BytesN, Env};

/// Storage key type for persistent storage
pub type StorageKey = BytesN<32>;

/// Simple storage helpers for common operations
/// Contracts should use direct storage operations for complex types
pub struct StorageHelper;

impl StorageHelper {
    /// Check if a key exists in persistent storage
    pub fn has(env: &Env, key: &BytesN<32>) -> bool {
        env.storage().persistent().has(key)
    }

    /// Check if a key exists in instance storage
    pub fn has_instance(env: &Env, key: &BytesN<32>) -> bool {
        env.storage().instance().has(key)
    }
}
