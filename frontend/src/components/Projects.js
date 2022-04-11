import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${project.name}`}>{project.name}</Link>
            </td>
            <td>
                {project.urlToRepo}
            </td>
            <td>
                <Button variant="danger" onClick={() => deleteProject(project.url)}>Delete</Button>
            </td>
            <td>
                <Link to={`/project/update/${project.uid}`} className='btn btn-primary'>Update</Link>
            </td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>
                    Name of project
                </th>
                <th>
                    Url to repository
                </th>
                <th>
                    <Link to="/project/create" className='btn btn-success'>Create project</Link>
                </th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
            </tbody>
        </Table>
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