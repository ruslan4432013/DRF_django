import React from 'react';

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.birthdayDate}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                First Name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Birthday Date
            </th>
            <th>
                Email
            </th>
            {users.map((user) => <UserItem user={user}/>)}
        </table>
    )
}

export default UserList;