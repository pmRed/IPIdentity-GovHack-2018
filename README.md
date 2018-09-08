# Project Description
This project attempts address three problems:
- Duplication and inconsistent IP rights records.
- Detection of invalid records on addition to the database
- Distributed depolyment of IP records (Blockchain)

# Question
_*Can we construct a clean, fault-tolerant, distributed and immutable IP rights ledger?*_

# Solution
We propose a solution that requires three parts:
- Standard de-duplication and verifiaction of previous records
- An interface for checking additions to an IP rights database
- A prototype implementation of a blockchain database of future IP records.

We will implement de-duplication and checking functionality using ```Levenshtein Distance``` to quantify string simmilarity and providing an expert driven interface to check the results. 

Our blockchain solution will be a smartcontract implemented on the EOSIO platform. 
Our aim is to provide a platform for internationally open and accessible IP records, 
where the smartcontract enforces de-duplication of records and verification. The contract will
also feature user permissions such that IP agencies can audit and update records where necessary.

## Implementation 

# Data sets

Key in: data/govhack-intro-2018.docx

Raw data in: data/data_for_govhack.csv

# Members

Aqeel Akber <aqeel@thaum.com.au>

Prithvi Reddy <prithvi@thaum.com.au>

Mahasen Sooriyabandara <mahasen@thaum.com.au>

Nic Donaldson <nic.donaldson.0@gmail.com>
