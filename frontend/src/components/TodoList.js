import React from 'react';

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
        <table>
            <th>
                User
            </th>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            {todo_list.map((todo) => <ToDoItem todo={todo}/>)}
        </table>
    )
}

export default ToDoList;