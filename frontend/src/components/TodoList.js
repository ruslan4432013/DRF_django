import React from 'react';
import {Table} from "react-bootstrap";

const ToDoItem = ({todo}) => {
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
        </tr>
    )
}

const ToDoList = ({todo_list}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>User</th>
                <th>Project</th>
                <th>Text</th>
            </tr>
            </thead>
            <tbody>
            {todo_list.map((todo) => <ToDoItem todo={todo}/>)}
            </tbody>
        </Table>
    )
}

export default ToDoList;