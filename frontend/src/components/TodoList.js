import React from 'react';
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const ToDoItem = ({todo, deleteNotify}) => {
    return (
        <tr>
            <td>
                {todo.user}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                <Button variant="danger" onClick={() => deleteNotify(todo.uid)}>Delete</Button>
            </td>
        </tr>
    )
}

const ToDoList = ({todo_list, deleteNotify}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>User</th>
                <th>Project</th>
                <th>Text</th>
                <th>
                    <Link to="/notify/create" style={{ width: '120px' }} className='btn btn-success'>Create notify</Link>
                </th>
            </tr>
            </thead>
            <tbody>
            {todo_list.map((todo) => <ToDoItem deleteNotify={deleteNotify} todo={todo}/>)}
            </tbody>
        </Table>
    )
}

export default ToDoList;