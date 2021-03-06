import React from "react";

import Header from "./components/Header";
import "./App.css";


class LoginPage extends React.Component {
    state = {
        username: '',
        password: '',
    };

    login = (event) => {
        event.preventDefault();
        const {username, password} = this.state;
        fetch('http://127.0.0.1:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
        .then((response) => {
            if(response.status!==200) {
              throw new Error(response.status)
            }
            return response.json()
        })
        .then((json) => {
            const token = json.token;
            localStorage.setItem('token', token);
            alert('You successfully logged in');
            window.location.replace('/')
        })
        .catch((error) => {
            alert('There has been an error logging in, please retry');
        });
    };

    updateUsername = (event) => {
        this.setState({username: event.target.value});
    };

    updatePassword = (event) => {
        this.setState({password: event.target.value});
    };

    render() {
        const {username, password} = this.state;
        return(
            <React.Fragment >
                <Header/>
                <div className="app">
                    <h1>Please Login</h1>
                    <form>
                        <input onChange={this.updateUsername} type="text" name="username" value={username}/>
                        <input onChange={this.updatePassword} type="password" name="password" value={password}/>
                        <button onClick={this.login}>Log in</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginPage;

