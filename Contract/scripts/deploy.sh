#!/bin/bash
set -euo pipefail

# Deploy script for Vaulty smart contracts
# Deploys built contracts to Stellar network via Stellar CLI

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

# Check if contracts directory exists
if [ ! -d "$CONTRACTS_DIR" ]; then
    echo "Error: Contracts directory not found: $CONTRACTS_DIR"
    echo "Run build.sh first to generate WASM files"
    exit 1
fi

echo "Deploying Vaulty contracts to $NETWORK..."

# Function to deploy a single contract
deploy_contract() {
    local contract_name=$1
    local wasm_file="$CONTRACTS_DIR/${contract_name}.wasm"
    
    if [ ! -f "$wasm_file" ]; then
        echo "Warning: $wasm_file not found, skipping"
        return
    fi
    
    echo "Deploying $contract_name..."
    
    # Deploy using Stellar CLI
    stellar contract deploy \
        --wasm "$wasm_file" \
        --source "$SOURCE_ACCOUNT" \
        --network "$NETWORK" \
        --output "$CONTRACTS_DIR/${contract_name}_id.txt"
    
    echo "Deployed $contract_name"
    echo "Contract ID saved to ${CONTRACTS_DIR}/${contract_name}_id.txt"
}

# Deploy each contract
deploy_contract "vault"
deploy_contract "streaks"
deploy_contract "lending"
deploy_contract "borrowing"
deploy_contract "rewards"

echo "Deployment complete. Contract IDs saved in $CONTRACTS_DIR"
