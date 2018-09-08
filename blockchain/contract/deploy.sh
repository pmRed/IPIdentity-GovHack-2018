#!/bin/bash

if [ -z "$1" ]
then
    account="thaum"
else
    account=$1
fi

if [ -z "$2" ]
then
    contract="mycontract"
else
    contract=$2
fi

shopt -s expand_aliases
source aliases
source dataStore

cleos wallet unlock --password $WALLET_PASSKEY
cleos wallet import --private-key $ACC_PRIVATE_KEY

cleos set contract $account build/contracts/ $contract.wasm $contract.abi -p $account@active
