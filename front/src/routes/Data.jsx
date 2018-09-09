import React, { Component } from 'react'
import Table from '../components/Table'
import {
    List,
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
        submissionDetails:true,
        submissionString: '',
        userDetails:true,
        userString: '',
        searchDetails:true,
        searchData: null,
        isLoading: false,
        exists: true,
        failed: true
    } 

    updateTable(){
        var request = this.state.name+'|'+this.state.ACN+'|'+this.state.ABN
        const promise = fetch('http://' + window.location.hostname + ':5000/search',
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
        const promise = fetch('http://' + window.location.hostname + ':5100/makeaccount?name='+this.state.ABN)
        await sleep(2000)
        promise.then((response) => response.json())
            .then((response) => {
                this.setState(response)
                this.setState({isLoading: false})
            })
        this.setState({block: false})
        this.setState({userDetails: false})
    }

    async submitToChain() {
        this.setState({block: true})
        const promise = fetch('http://' + window.location.hostname + ':5100/addapplication?privkey='+this.state.key+'&appdoc='+this.state.notes)
        await sleep(2000)
        promise.then((response) => response.json())
            .then((response) => {
                this.setState(response)
                this.setState({isLoading: false})
            })
        //await sleep(2000)
        this.setState({block: false})
        this.setState({submissionDetails: false})
    }

    async searchChain() {
        this.setState({block: true})
        const promise = fetch('http://' + window.location.hostname + ':5100/getapplication?hash='+this.state.search)
        await sleep(2000)
        promise.then((response) => response.json())
            .then((response) => {
                this.setState(response)
                this.setState({isLoading: false})
            })
        //await sleep(2000)
        this.setState({block: false})
        this.setState({searchDetails: false})
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

        if(this.state.searchData){
            table =( 
                <Table
                    labels = {this.state.searchData['labels']}
                    data = {this.state.searchData['data']}
                    processCellContent = {
                        (e,t)=> <div>{e}</div>
                    }
                />
            )
        }
        var positive = this.state.userDetails || this.state.exists
        var positive_submission = this.state.submissionDetails || this.state.failed
        var positive_search = this.state.searchDetails || this.state.notfound
        return (
            <Dimmer.Dimmable dimmed={this.state.isLoading} style={{height:'100%'}}>
                <Container fluid style={{padding:'50px 50px'}}>
                    <h1> IP and ID Registration</h1>
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
                        <Message negative hidden={this.state.userDetails || !this.state.exists}>
                            <h3>Your details have already been registered!</h3> 
                        </Message>
                        <Message positive hidden={positive}>
                            <h3>Your Blockchain ID</h3> 
                            <p>This is your key to the IP-database, please store it safely:</p>
                            <List>
                                <List.Item>
                                    <b>Account Name: </b>{this.state.accname}
                                </List.Item> 
                                <List.Item>
                                    <b>Public Key: </b>{this.state.pubkey}
                                </List.Item> 
                                <List.Item>
                                    <b>Private Key: </b>{this.state.privkey}
                                </List.Item> 
                            </List>
                        </Message>
                    </Segment>
                    <Segment color='teal'>
                        <h2>Apply For IP</h2>
                        <Form>
                            <Form.Input fluid disabled={this.state.block} label='Your private key' onChange={(e,{value})=>this.setState({key:value})} placeholder='enter user key...' />
                            <Form.TextArea disabled={this.state.block} label='IP Documents' onChange={(e,{value})=>this.setState({notes:value})}  placeholder='include any required documentation here...' />
                            <Form.Button disabled={this.state.block} color='teal' onClick={e=>{this.submitToChain()}}>Submit</Form.Button>
                        </Form>
                        <Message negative hidden={this.state.submissionDetails || !this.state.failed}>
                            <h3>Uh oh...</h3>
                            <p>Either your private key is wrong or you have already submitted this!</p>
                            <p><b>Computer says... {this.state.transactionlabel}</b></p>
                        </Message>
                        <Message positive hidden={positive_submission}>
                            <h3>Acknowledgement of Submission</h3> 
                            <p>Your data has been successfully added to the record:</p>
                            <b>Application Hash: </b>{this.state.transactionlabel}
                            <p>So far you have submitted {this.state.numapplications} applications.</p>
                        </Message>
                    </Segment>
                    <Segment color='orange'>
                        <h2>Get blockchain verified application</h2>
                        <Form>
                            <Form.Input fluid disabled={this.state.block} label='Search' onChange={(e,{value})=>this.setState({search:value})} placeholder='enter application hash...' />
                            <Form.Button disabled={this.state.block} color='orange' onClick={e=>{this.searchChain()}}>Search</Form.Button>
                        </Form>
                        <Message negative hidden={this.state.searchDetails || !this.state.notfound}>
                            <h3>No application found on the blockchain</h3>
                        </Message>
                        <Message positive hidden={positive_search}>
                            <h3>Found application!</h3>
                            <b>Submitted by ABN: {this.state.abn}</b>
                            <p><b>Application Document</b></p>
                            <p>{this.state.application}</p>
                        </Message>
                    </Segment>

                </Container>
                <Dimmer inverted active={this.state.block}>
                    <Loader content="Communicating with EOSIO"/>
                </Dimmer>
            </Dimmer.Dimmable>
        )
    }
}
