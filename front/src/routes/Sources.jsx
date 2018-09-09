import React, { Component } from 'react'
import {
    List,
    Container,
    Segment,
} from 'semantic-ui-react'


export default class Page extends Component {
    render() {
        return (
            <Container>
              <Segment style={{ padding: '30px 30px' }} vertical>
                <h1> Data Sources and Discussion</h1>

                <h2>Can we construct a clean, fault-tolerent, distributed, borderless, IP ledger?</h2>

                <p>Yes we can! But wait, there\'s more! This decentralized database inherently will not allow duplicates. Such an application is mathematically invalid and will not succeed. With blockchain, we have solved the issue of duplication transparently and provided added benefits too. In addition, we have implemented a persistance layer between the blockchain and the user that allows the ability for any user to retrieve blockchain verified IP records from the their web browser.</p>

                <List divided relaxed>

                  <List.Item>
                    <List.Icon name='database' size='huge' verticalAlign='middle' />
                    <List.Content>
                      <List.Header as='a' href='https://data.gov.au/dataset/govhack-2018-ip-australia'>GovHack IP Australia 2018 Data set</List.Header>
                      <List.Description>
                        <p>We used this dataset to provide fuzzy searching and referencing against existing applicants that were serialized classically i.e. not on the blockchain where duplication is inherently solved and verification gauranteed.</p>
                      </List.Description>
                    </List.Content>
                  </List.Item>



                </List>
              </Segment>
            </Container>
        )
    }
}
