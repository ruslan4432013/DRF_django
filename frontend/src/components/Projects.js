import React from 'react';
import {Link, useParams} from 'react-router-dom';

const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.urlToRepo}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                Name of project
            </th>
            <th>
                Url to repository
            </th>
            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

const ProjectDetailItem = ({project}) => {
    let user_list = '['
    project.users.forEach((user) => { user_list +=`${user.firstName}, `})
    user_list += ']'
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td style={{color:'green'}}>
                {user_list}
            </td>
            <td>
                {project.urlToRepo}
            </td>
        </tr>
    )
}

const ProjectDetail = ({items}) => {
    let {name} = useParams()
    let filtered_items = items.filter((item) => item.name === name)
    console.log(name)
    return (
        <table>
            <th>
                Name of project
            </th>
            <th>
                Users
            </th>
            <th>
                Url to repo
            </th>
            {filtered_items.map((item) => <ProjectDetailItem project={item}/>)}
        </table>
    )
}

export {ProjectDetail, ProjectList};