import {useParams} from "react-router-dom";
import React from 'react';
import {Container, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";


const ProjectFormUpdate = ({items, users, updateProject}) => {
    let {uid} = useParams()

    const filter_item = items.filter((item) => item['uid'] === uid)[0]
    let state = {name: '', urlToRepo: '', owner: ''}
    try {
        state = {name: filter_item.name, urlToRepo: filter_item.urlToRepo, owner: filter_item.owner}
    } catch (error) {
        console.log(error)
    }

    function handleSubmit(event) {
        updateProject(uid, state.name, state.urlToRepo, state.owner)
        event.preventDefault()
    }

    function handleChange(event) {
        console.log(event.target.value)
        state[event.target.name] = event.target.value
    }

    return (
        <Container className='mt-5'>
            <Form onSubmit={(event) => handleSubmit(event)}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name of project</Form.Label>
                    <Form.Control type="text" onChange={(event) => handleChange(event)}
                                  defaultValue={state.name} name="name"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Url to repository</Form.Label>
                    <Form.Control type="text" onChange={(event) => handleChange(event)}
                                  defaultValue={state.urlToRepo} name="urlToRepo"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Owner</Form.Label>
                    <Form.Select type="text" onChange={(event) => handleChange(event)}
                                 defaultValue={state.owner} name='owner'>

                        {users.map((item) => <option value={item.url}>{item.username}</option>)}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" value="Save">
                    Update project
                </Button>
            </Form>
        </Container>
    )
}


export {ProjectFormUpdate}