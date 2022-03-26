import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const MenuItem = () => {
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
                    <Nav>
                        <Nav.Link><Link className="link-light me-5" to="/login">Login</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>

        </Navbar>
    )
}

export default MenuItem;