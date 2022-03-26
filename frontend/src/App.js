import './App.css';
import React from 'react';
import UserList from './components/Users.js';
import MenuItem from './components/Menu.js';
import FooterItem from './components/Footer.js'
import {Route, BrowserRouter, Routes, Link} from "react-router-dom";
import axios from 'axios';
import {ProjectList, ProjectDetail} from "./components/Projects";
import TodoList from "./components/TodoList";
import LoginForm from "./components/Auth";
import Cookies from "universal-cookie/es6";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todo_list': [],
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
                'todo_list': todo_list.data.results,
            })
        })).catch(error => {
            console.log(error)
            this.setState({
                'users': [],
                'projects': [],
                'todo_list': [],
                'username': ''
            })
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


    componentDidMount() {
        this.get_token_from_storage()
        this.get_user()
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <MenuItem helper={(this)} username={this.state.username}/>
                    <Routes>
                        <Route path="/" element={<UserList users={this.state.users}/>}/>
                        <Route path="/projects" element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path="/todo" element={<TodoList todo_list={this.state.todo_list}/>}/>
                        <Route path="/project/:name" element={<ProjectDetail items={this.state.projects}/>}/>
                        <Route path="/login" element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
