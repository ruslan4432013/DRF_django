import React from 'react';
import {Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

const MenuItem = ({helper, username, handleInputChange}) => {
    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">

            <Navbar.Brand className="ms-5">TODO APP</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link><Link className="link-light" to="/">Users</Link></Nav.Link>
                    <Nav.Link><Link className="link-light" to="/projects">Projects</Link></Nav.Link>
                    <Nav.Link><Link className="link-light" to="/todo">ToDo List</Link></Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                        onChange={(event)=> handleInputChange(event)}
                        type="search"
                        placeholder="Search project"
                        className="me-2"
                        aria-label="Search"
                    />
                </Form>
                <Nav>
                    <Nav.Link> {helper.is_authenticated() ? <Button className="me-5"
                                                                    onMouseOver={(event) => event.target.textContent='Logout'}
                                                                    onMouseOut={(event) => event.target.textContent=`${username}`}
                                                                    onClick={() => helper.logout()}>{username}</Button> :
                        <Link className="me-5 btn btn-primary" to='/login'>Login</Link>}
                    </Nav.Link>
                </Nav>

            </Navbar.Collapse>
        </Navbar>
    )
}

export default MenuItem;