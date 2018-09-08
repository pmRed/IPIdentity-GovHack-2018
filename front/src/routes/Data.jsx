import React, { Component } from 'react'
import Table from '../components/Table'
import {
    Input,
    Segment,
    Container
} from 'semantic-ui-react'



export default class Page extends Component {
    state = {
        dataLabels: [],
        dataTable: [],
        request:''
    } 

    updateTable(){
        fetch('http://localhost:5000/search',
            {method: 'POST', cache: 'default', headers:
            {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({'key': this.state.request})})
            .then((response) => response.json())
            .then((response) => this.setState(response))
    }

    render() {
        var table = ''
        if(this.state.dataLabels){
            table =( 
                <Table
                    labels = {this.state.dataLabels}
                    data = {this.state.dataTable}
                    processCellContent = {
                        (e,t)=> <div>{e}</div>
                    }
                />
            )
        }

        return (
            <Container fluid style={{padding:'50px 50px'}}>
                <h1>Duplicate Query and Explorer</h1>
                <Segment>
                    <h3>Enter Applicant Details</h3>
                    <Input action={{ icon: 'search', onClick: e=>{this.updateTable()}}}
                        placeholder='Search...' 
                        onChange={(e, {value}) => {this.setState({request: value})}}
                    />
                    <Container fluid style={{overflowX: 'scroll'}}>
                        {table}
                    </Container>
                </Segment>

            </Container>
        )
    }
}
