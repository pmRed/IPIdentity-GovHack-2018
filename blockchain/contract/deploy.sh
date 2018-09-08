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

cleos set contract $account build/contracts/ $contract.wast $contract.abi -p $account
