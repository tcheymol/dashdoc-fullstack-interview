import React from "react";

import Header from "./components/Header";
import "./App.css";

const LoginPage = () => (
    <React.Fragment >
        <Header/>
        <div className="app">
            <h1>Please Login</h1>
            <form>
                <input type="text" name="username"/>
                <input type="password" name="password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    </React.Fragment>
);

export default LoginPage;

