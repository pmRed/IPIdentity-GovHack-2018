# Project Description
This project attempts address three problems:
- Duplication and inconsistent IP rights records.
- Detection of invalid records on addition to the database
- Distributed depolyment of IP records (Blockchain)

# Question
_*Can we construct a clean, fault-tolerant, distributed and immutable IP rights ledger?*_

# Solution
Our solution leverages blockchain technology to provide a decentralized database for serialising immutable artefacts of IP records, which satisfies the above requirements. Built on the EOSIO platform, IP-identity leverages the sophisticated smart-contract and on-chain persistence services provided by the EOSIO API.
                
Our platform allows users to create and view IP documents through a web interface. Duplication of entries is intrinsically impossible through our use of document hashes as indices in the EOSIO Multi-Index DB API. Users receive feedback if their entry is similar to an existing entry through a poop-up list of similar entries.
                
To facilitate rapid querying of our IP database, a custom persistence layer is created locally, which is verification against the blockchain. In this way, users get the best of both worlds: the responsiveness of a local databse, and the security of a decentralised blockchain database.

## Implementation 

# Data sets

Key in: data/govhack-intro-2018.docx

Raw data in: data/data_for_govhack.csv

# Members

Aqeel Akber <aqeel@thaum.com.au>

Prithvi Reddy <prithvi@thaum.com.au>

Mahasen Sooriyabandara <mahasen@thaum.com.au>

Nic Donaldson <nic.donaldson.0@gmail.com>
