#!/bin/bash

if [ -z "$1" ]
then
    contract="mycontract"
else
    contract=$1
fi

shopt -s expand_aliases
source aliases

mkdir -p build/contracts

eosiocpp -o build/contracts/$contract.wast src/contracts/$contract/*.cpp
eosiocpp -g build/contracts/$contract.abi src/contracts/$contract/*.cpp

# fix the docker damage
docker exec nodeos chown $UID:$UID /playground/build/contracts/$contract.{wasm,wast,abi}
