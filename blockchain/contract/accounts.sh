#!/bin/bash

echo "Setting aliases"
shopt -s expand_aliases
source aliases

EOSIO_PRIVATE_KEY="5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"

echo "Create cleos wallet"
PASSKEY=`cleos wallet create | tail -1 | sed 's/\"//g'`
echo "Password: $PASSKEY"

echo "Registering eosio private key"
EOSIO_PUBLIC_KEY=`cleos wallet import --private-key $EOSIO_PRIVATE_KEY | sed "s/.*:\s//g"`

echo "Creating user and tester accounts"
BUFFER=`cleos create key`
ACC_PRIVATE_KEY=`echo "$BUFFER" | grep "Private" | sed "s/.*:\s//g"`
ACC_PUBLIC_KEY=`echo "$BUFFER" | grep "Public" | sed "s/.*:\s//g"`

cleos create account eosio thaum $ACC_PUBLIC_KEY $ACC_PUBLIC_KEY
cleos create account eosio user $ACC_PUBLIC_KEY $ACC_PUBLIC_KEY
cleos create account eosio tester $ACC_PUBLIC_KEY $ACC_PUBLIC_KEY

rm -f dataStoreBUF
touch dataStoreBUF
echo "WALLET_PASSKEY=$PASSKEY" >> dataStoreBUF
echo "EOSIO_PRIVATE_KEY=$EOSIO_PRIVATE_KEY" >> dataStoreBUF
echo "EOSIO_PUBLIC_KEY=$EOSIO_PUBLIC_KEY" >> dataStoreBUF
echo "ACC_PRIVATE_KEY=$ACC_PRIVATE_KEY" >> dataStoreBUF
echo "ACC_PUBLIC_KEY=$ACC_PUBLIC_KEY" >> dataStoreBUF
sed -e "s///" dataStoreBUF > dataStore
