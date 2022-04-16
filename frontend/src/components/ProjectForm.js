import React from 'react';
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";





class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            urlToRepo: '',
            owner: props.users[0]?.uid
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        this.props.createProject(this.state.name, this.state.urlToRepo, this.state.owner)
        event.preventDefault()
    }

    render() {
        return (
            <Container className='mt-5'>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Name of project</Form.Label>
                        <Form.Control type="text" onChange={(event) => this.handleChange(event)}
                                      defaultValue={this.state.name} name="name"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Url to repository</Form.Label>
                        <Form.Control type="text" onChange={(event) => this.handleChange(event)}
                                      defaultValue={this.state.urlToRepo} name="urlToRepo"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Owner</Form.Label>
                        <Form.Select type="text" onChange={(event) => this.handleChange(event)}
                                     defaultValue={this.state.owner} name='owner'>

                            {this.props.users.map((item) => <option value={item.url}>{item.username}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Save">
                        Create project
                    </Button>
                </Form>
            </Container>
        )
    }
}



export default ProjectForm