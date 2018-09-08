import React, { Component } from 'react'
import {
    Container,
    Form,
    Segment,
} from 'semantic-ui-react'


export default class Page extends Component {
    render() {
        return (
            <Container fluid style={{padding:'50px 50px'}}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Company Name' placeholder='enter name...' />
                        <Form.Input fluid label='ABN' placeholder='11 digits...' />
                        <Form.Input fluid label='ACN' placeholder='9 digits...' />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Company Name' placeholder='enter name...' />
                        <Form.Input fluid label='ABN' placeholder='11 digits...' />
                        <Form.Input fluid label='ACN' placeholder='9 digits...' />
                    </Form.Group>
                    <Form.TextArea label='Notes' placeholder='Include an additional notes here...' />
                    <Form.Button>Submit</Form.Button>
                </Form>
            </Container>
        )
    }
}
