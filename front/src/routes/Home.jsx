import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Grid,
    Header,
    Image,
    Segment,
} from 'semantic-ui-react'

//
export default class Page extends Component {
    render() {
        return (
            <Container>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <h1>Can we construct a user-friendly, fault-tolerant, distributed and immutable database for IP records?</h1> 
                    Our solution leverages blockchain technology to provide a decentralized database for serialising immutable artefacts of IP records, which satisfies the above requirements. Built on the EOSIO platform, IP-identity leverages the sophisticated smart-contract and on-chain persistence services provided by the EOSIO API.
                    
                    Our platform allows users to create and view IP documents through a web interface. Duplication of entries is intrinsically impossible through our use of document hashes as indices in the EOSIO Multi-Index DB API. Users receive feedback if their entry is similar to an existing entry through a poop-up list of similar entries.
                    
                    To facilitate rapid querying of our IP database, a custom persistence layer is created locally, which is verification against the blockchain. In this way, users get the best of both worlds: the responsiveness of a local databse, and the security of a decentralised blockchain database.
                </Segment>
            </Container>
        )
    }
}
