import React from 'react';
import Button from 'react-bootstrap/Button';
import {Form} from "react-bootstrap";


class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {'login': '', 'password': ''}
    }


    handleChange(event) {

        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        console.log(this.state.login + ' ' + this.state.password)
        event.preventDefault();
    }

    render() {
        return (
            <div className='container'>
                <Form onSubmit={(event) => this.handleSubmit(event)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Login</Form.Label>
                        <Form.Control onChange={(event) => this.handleChange(event)} defaultValue={this.state.login}
                                      type="login"
                                      name="login"
                                      placeholder="Login"/>
                    </Form.Group>

                    <Form.Group className="mb-3"
                                controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={(event) => this.handleChange(event)} defaultValue={this.state.password}
                                      type="password"
                                      name="password"
                                      placeholder="Password"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Login">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default LoginForm