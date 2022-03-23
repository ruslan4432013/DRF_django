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
    project.users.forEach((user) => {
        user_list += `${user.firstName}, `
    })
    console.log(project)
    user_list = user_list.slice(0, -2) + ']'
    return (
        <div>
            <div><h1>Название проекта: <span style={{color: 'green'}}>{project.name}</span></h1></div>
            <div><h1>Список пользователей: {user_list}</h1></div>
            <div><b>Ссылка на репозиторий</b> {project.urlToRepo}</div>
        </div>


    )
}

const ProjectDetail = ({items}) => {
    let {name} = useParams()
    let filtered_items = items.filter((item) => item.name === name)
    return (
        <div>{filtered_items.map((item) => <ProjectDetailItem project={item}/>)}</div>
    )
}

export {ProjectDetail, ProjectList};