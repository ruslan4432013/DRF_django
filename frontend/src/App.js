import './App.css';
import React from 'react';
import UserList from './components/Users.js';
import MenuItem from './components/Menu.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from 'axios';
import {ProjectDetail, ProjectList} from "./components/Projects";
import TodoList from "./components/TodoList";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";
import ProjectForm from "./components/ProjectForm";
import NotifyForm from "./components/NotifyForm";
import {ProjectFormUpdate} from "./components/ProjectFormUpdate";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo_list': [],
            'filtered_projects': [],
            'access_token': '',
            'refresh_token': '',
            'username': ''
        }
    }

    set_tokens(access_token, refresh_token) {
        const cookies = new Cookies()
        cookies.set('access_token', access_token)
        cookies.set('refresh_token', refresh_token)
        this.setState({
            'access_token': access_token,
            'refresh_token': refresh_token
        }, () => this.load_data())
    }

    set_user(username) {
        const cookies = new Cookies()
        cookies.set('username', username)
        this.setState({'username': username}, () => this.get_token())

    }

    get_user() {
        const cookies = new Cookies()
        const username = cookies.get('username')
        this.setState({
            'username': username,
        }, () => this.get_token())
    }

    is_authenticated() {
        return (this.state.access_token !== '') && (this.state.refresh_token !== '')
    }

    logout() {
        this.set_tokens('', '')
        this.set_user('')
    }

    refresh_token() {
        axios.post('http://127.0.0.1:8000/api/v1/token/refresh/', {
            'refresh': this.state.refresh_token
        }).then(response => {
            console.log('refresh')
            this.set_tokens(response.data['access'], this.state.refresh_token);
        }).catch(error => {
            console.log(error)
            this.logout()
            this.setState({
                'users': [],
                'projects': [],
                'todo_list': [],
                'filtered_projects': [],
                'username': ''
            })
        })
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const access_token = cookies.get('access_token')
        const refresh_token = cookies.get('refresh_token')
        this.setState({
            'access_token': access_token,
            'refresh_token': refresh_token
        }, () => this.load_data())
    }


    load_data() {
        const headers = this.get_headers()
        axios.all([
            axios.get('http://127.0.0.1:8000/api/users/', {headers}),
            axios.get('http://127.0.0.1:8000/api/projects', {headers}),
            axios.get('http://127.0.0.1:8000/api/todo-list/', {headers})
        ]).then(axios.spread((users, projects, todo_list) => {
            this.setState({
                'users': users.data.results,
                'projects': projects.data.results,
                'filtered_projects': projects.data.results,
                'todo_list': todo_list.data.results,
            })
        })).catch(error => {
            this.refresh_token()
        })
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api/v1/token/', {
            'username': username,
            'password': password
        }).then(response => {
            this.set_tokens(response.data['access'], response.data['refresh'])
            this.set_user(username)
            document.location.href = '/'
        }).catch(error => console.log(error))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'JWT ' + this.state.access_token
        }
        return headers
    }

    deleteProject(projectUrl) {
        const headers = this.get_headers()
        axios.delete(`${projectUrl}`, {headers}).then(response => {
            this.setState({projects: this.state.projects.filter((item) => item.url !== projectUrl)})
        }).catch(error => {
            console.log(error)
        })
    }

    createProject(name, urlToRepo, ownerUrl) {
        const headers = this.get_headers()
        const data = {name: name, url_to_repo: urlToRepo, owner: ownerUrl}
        axios.post('http://127.0.0.1:8000/api/projects/', data, {headers}).then(response => {
            let new_project = response.data
            new_project.owner = this.state.users.filter((item) => item.url === new_project.owner)[0]
            this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))

    }

    updateProject(projectUid, name, urlToRepo, ownerUrl) {
        const headers = this.get_headers()
        const data = {uid: projectUid, name: name, url_to_repo: urlToRepo, owner: ownerUrl}
        axios.put(`http://127.0.0.1:8000/api/projects/${projectUid}/`, data, {headers}).then(response => {

            let project = this.state.projects.filter((item) => item.uid === projectUid)[0]
            this.setState({projects: this.state.projects.filter((item) => item.uid !== projectUid)})
            project.name = name
            project.urlToRepo = urlToRepo
            project.owner = this.state.users.filter((item) => item.url = ownerUrl)[0]
            this.setState({projects: [...this.state.projects, project]})
        }).catch(error => console.log(error))

    }

    deleteNotify(uid) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo-list/${uid}`, {headers}).then(response => {
            this.setState({todo_list: this.state.todo_list.filter((item) => item.uid !== uid)})
        }).catch(error => {
            console.log(error)
        })
    }

    createNotify(user, project, text) {
        const headers = this.get_headers()
        const data = {project: project, user: user, text: text}
        axios.post('http://127.0.0.1:8000/api/todo-list/', data, {headers}).then(response => {
            let new_notify = response.data
            new_notify.user = this.state.users.filter((item) => item.uid === new_notify.user)[0].username
            new_notify.project = this.state.projects.filter((item) => item.uid === new_notify.project)[0].name
            this.setState({todo_list: [...this.state.todo_list, new_notify]})
        }).catch(error => console.log(error))
    }

    handleInputChange(event) {
        const query = event.target.value
        let filteredItems = this.state.projects.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
        let allItems = this.state.projects
        if (query) {
            this.setState({filtered_projects: filteredItems})
        } else {
            this.setState({filtered_projects: allItems})
        }
    }


    componentDidMount() {
        this.get_token_from_storage()
        this.get_user()
    }


    render() {

        return (
            <div>
                <BrowserRouter>
                    <MenuItem helper={(this)} handleInputChange={(event) => this.handleInputChange(event)}
                              username={this.state.username}/>
                    <Routes>
                        <Route path="/" element={<UserList users={this.state.users}/>}/>

                        <Route path="/projects" element={<ProjectList projects={this.state.filtered_projects}
                                                                      deleteProject={(url) => this.deleteProject(url)}/>}/>
                        <Route path="/todo" element={<TodoList deleteNotify={(uid) => this.deleteNotify(uid)}
                                                               todo_list={this.state.todo_list}/>}/>
                        <Route path="/project/:name" element={<ProjectDetail items={this.state.projects}/>}/>
                        <Route path="/project/create" element={<ProjectForm users={this.state.users}
                                                                            createProject={(name, urlToRepo, ownerUrl) => this.createProject(name, urlToRepo, ownerUrl)}/>}/>
                        <Route path="/project/update/:uid"
                               element={<ProjectFormUpdate items={this.state.projects} users={this.state.users}
                                                           updateProject={(projectUrl, name, urlToRepo, ownerUrl) => this.updateProject(projectUrl, name, urlToRepo, ownerUrl)}/>}/>
                        <Route path="/notify/create" element={<NotifyForm users={this.state.users}
                                                                          projects={this.state.projects}
                                                                          createNotify={(user, project, text) => this.createNotify(user, project, text)}/>}/>
                        <Route path="/login" element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}


export default App;
