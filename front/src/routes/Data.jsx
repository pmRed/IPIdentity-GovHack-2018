import React, { Component } from 'react'
import Table from '../components/Table'
import {
    Loader,
    Dimmer,
    Input,
    Segment,
    Container
} from 'semantic-ui-react'



export default class Page extends Component {
    state = {
        dataLabels: [],
        dataTable: [],
        request:'',
        isLoading: false
    } 

    updateTable(){
        const promise = fetch('http://localhost:5000/search',
            {method: 'POST', cache: 'default', headers:
            {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({'key': this.state.request})})
        this.setState({isLoading: true})
        promise.then((response) => response.json())
            .then((response) => {
                this.setState(response) 
                this.setState({isLoading: false})
            })
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
                <Dimmer.Dimmable dimmed={this.state.isLoading} style={{height:'100%'}}>
                    <Segment>
                        <h3>Enter Applicant Details</h3>
                        <Input action={{ icon: 'search',
                            onClick: e=>{this.updateTable()}}}
                        placeholder='Search...' 
                        onChange={(e, {value}) => {this.setState({request: value})}}
                        />
                        <Container fluid style={{overflowX: 'scroll', paddingTop: '10px'}}>
                            {table}
                        </Container>
                    </Segment>
                    <Dimmer inverted active={this.state.isLoading}>
                        <Loader content="Loading"/>
                    </Dimmer>
                </Dimmer.Dimmable>
            </Container>

        )
    }
}
