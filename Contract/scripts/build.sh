#!/bin/bash
set -euo pipefail

# Build script for Vaulty smart contracts
# Builds all contracts in the workspace and outputs .wasm files

echo "Building Vaulty smart contracts..."

# Build all contracts in release mode
cargo build --release --target wasm32-unknown-unknown

# Create output directory for WASM files
mkdir -p target/wasm

# Copy WASM files to a centralized location
for contract in vault streaks lending borrowing rewards; do
    if [ -f "target/wasm32-unknown-unknown/release/${contract}.wasm" ]; then
        cp "target/wasm32-unknown-unknown/release/${contract}.wasm" "target/wasm/"
        echo "Built: ${contract}.wasm"
    else
        echo "Warning: ${contract}.wasm not found"
    fi
done

echo "Build complete. WASM files available in target/wasm/"
