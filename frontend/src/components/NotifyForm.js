import React from 'react';
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";


class NotifyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            project: props.projects[0]?.uid,
            user: props.users[0]?.uid
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
        this.props.createNotify(this.state.user, this.state.project, this.state.text)
        event.preventDefault()
    }

    render() {
        console.log(this.state.project)
        console.log(this.state.user)

        return (
            <Container className='mt-5'>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>User</Form.Label>
                        <Form.Select type="text" onChange={(event) => this.handleChange(event)}
                                     defaultValue={this.state.user} name='user'>

                            {this.props.users.map((item) => <option value={item.uid}>{item.username}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Project</Form.Label>
                        <Form.Select type="text" onChange={(event) => this.handleChange(event)}
                                     defaultValue={this.state.project} name='project'>

                            {this.props.projects.map((item) => <option value={item.uid}>{item.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Text notify</Form.Label>
                        <Form.Control name="text" onChange={(event) => this.handleChange(event)} as="textarea" rows={3}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Save">
                        Add notification
                    </Button>
                </Form>
            </Container>
        )
    }


}

export default NotifyForm