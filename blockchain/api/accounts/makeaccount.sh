#!/bin/bash

#echo "Setting aliases"
shopt -s expand_aliases
source ../../contract/aliases

EOSIO_PRIVATE_KEY="5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"

#echo "Create cleos wallet"
#PASSKEY=`cleos wallet create --to-console | tail -1 | sed 's/\"//g'`
#echo "Password: $PASSKEY"

#echo "Registering eosio private key"
#EOSIO_PUBLIC_KEY=`cleos wallet import --private-key $EOSIO_PRIVATE_KEY | sed "s/.*:\s//g"`
source ../../contract/dataStore
cleos wallet unlock --password $WALLET_PASSKEY &> /dev/null

#echo "Creating user and tester accounts"
BUFFER=`cleos create key --to-console`
ACC_PRIVATE_KEY=`echo "$BUFFER" | grep "Private" | sed "s/.*:\s//g"`
ACC_PUBLIC_KEY=`echo "$BUFFER" | grep "Public" | sed "s/.*:\s//g"`

#cleos create account eosio thaum $ACC_PUBLIC_KEY $ACC_PUBLIC_KEY
#cleos create account eosio user $ACC_PUBLIC_KEY $ACC_PUBLIC_KEY
cleos create account eosio $1 $ACC_PUBLIC_KEY $ACC_PUBLIC_KEY --json

rm -f dataStoreBUF_User_$1
touch dataStoreBUF_User_$1
echo "WALLET_PASSKEY=$PASSKEY" >> dataStoreBUF_User_$1
echo "EOSIO_PRIVATE_KEY=$EOSIO_PRIVATE_KEY" >> dataStoreBUF_User_$1
echo "EOSIO_PUBLIC_KEY=$EOSIO_PUBLIC_KEY" >> dataStoreBUF_User_$1
echo "ACC_PRIVATE_KEY=$ACC_PRIVATE_KEY" >> dataStoreBUF_User_$1
echo "ACC_PUBLIC_KEY=$ACC_PUBLIC_KEY" >> dataStoreBUF_User_$1
sed -e "s///" dataStoreBUF_User_$1 > dataStore_User_$1
