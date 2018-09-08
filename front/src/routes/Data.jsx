import React, { Component } from 'react'
import Table from '../components/Table'
import {
    Button,
    Message,
    Loader,
    Form,
    Dimmer,
    Input,
    Segment,
    Container
} from 'semantic-ui-react'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default class Page extends Component {
    state = {
        dataLabels: [],
        dataTable: [],
        name:'',
        ACN:'',
        ABN:'',
        warning: true,
        block: false,
        userDetails:true,
        userString: "somekey",
        isLoading: false
    } 

    updateTable(){
        var request = this.state.name+'|'+this.state.ACN+'|'+this.state.ABN
        const promise = fetch('http://localhost:5000/search',
            {method: 'POST', cache: 'default', headers:
            {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({'key': request})})
        // this.setState({isLoading: true})
        promise.then((response) => response.json())
            .then((response) => {
                this.setState(response) 
                this.setState({isLoading: false})
            })
        this.setState({warning: false})
    }

    async newUser() {
        this.setState({warning: true})
        this.setState({block: true})
        await sleep(2000)
        this.setState({block: false})
        this.setState({userDetails: false})
    }

    async submitToChain() {
        this.setState({block: true})
        await sleep(2000)
        this.setState({block: false})
    }

    async searchChain() {
        this.setState({block: true})
        await sleep(2000)
        this.setState({block: false})
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
            <Dimmer.Dimmable dimmed={this.state.isLoading} style={{height:'100%'}}>
                <Container fluid style={{padding:'50px 50px'}}>
                    <Segment color='blue'>
                        <h2>New Business Registration</h2>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid disabled={this.state.block} label='Company Name' onChange={(e,{value})=>this.setState({name:value})} placeholder='enter name...' />
                                <Form.Input fluid disabled={this.state.block} label='ABN' onChange={(e,{value})=>this.setState({ABN:value})} placeholder='11 digits...' />
                                <Form.Input fluid disabled={this.state.block} label='ACN' onChange={(e,{value})=>this.setState({ACN:value})} placeholder='9 digits...' />
                            </Form.Group>
                            <Form.Button disabled={this.state.block} color='blue' onClick={e=>{this.updateTable()}}>Check</Form.Button>
                        </Form>
                        <Message
                            hidden={this.state.warning}
                            warning
                            header='Could you check something!'
                        >
                            <h3>Please ensure that you have not already registered!</h3>
                            {table}
                            <Button style={{marginTop: '10px'}} color='green' onClick={e=>{this.newUser()}}>Continue</Button>
                        </Message>
                    </Segment>
                    <Segment hidden={this.state.userDetails} color='red'>
                        <h2>New User Key</h2> 
                        <p>This is your IP user key, please store it safely:</p>
                        {this.state.userString}
                    </Segment>
                    <Segment color='teal'>
                        <h2>Apply For IP</h2>
                        <Form>
                            <Form.Input fluid disabled={this.state.block} label='Key' onChange={(e,{value})=>this.setState({key:value})} placeholder='enter user key...' />
                            <Form.TextArea disabled={this.state.block} label='IP Documents' onChange={(e,{value})=>this.setState({notes:value})}  placeholder='Include any required documentation here...' />
                            <Form.Button disabled={this.state.block} color='teal' onClick={e=>{this.submitToChain()}}>Submit</Form.Button>
                        </Form>
                    </Segment>
                    <Segment color='orange'>
                        <h2>Search IP History</h2>
                        <Form>
                            <Form.Input fluid disabled={this.state.block} label='Search' onChange={(e,{value})=>this.setState({search:value})} placeholder='enter list of search terms...' />
                            <Form.Button disabled={this.state.block} color='orange' onClick={e=>{this.searchChain()}}>Search</Form.Button>
                        </Form>
                    </Segment>

                </Container>
                <Dimmer inverted active={this.state.block}>
                    <Loader content="Pushing to EOS"/>
                </Dimmer>
            </Dimmer.Dimmable>
        )
    }
}
