import React, { Component } from 'react'
import Table from '../components/Table'
import {
    Container,
} from 'semantic-ui-react'


var dataLabels = [{id: 'a', name: 'stuff'}, {id: 'b', name: 'stuff'}]
var dataTable = [{key: 'el1', value: {'a':'stuff1', 'b':'stuff2'}}]

export default class Page extends Component {
    render() {
        return (
            <Container fluid style={{padding:'50px 50px'}}>
                <Table
                    labels = {dataLabels}
                    data = {dataTable}
                    processCellContent = {
                        (e,t)=> <div>{e}</div>
                    }
                />

            </Container>
        )
    }
}
