import React from "react";
import { Link } from "react-router-dom";
import "../App.css";


class Header extends React.Component{
    state = {
        username: null,
    };

    fetchCurrentUser = async () => {
         const token = localStorage.getItem('token');
         fetch('http://127.0.0.1:8000/me/', {
                method: 'GET',
                headers: {
                    "Authorization": `Token ${token}`,
                },
            })
            .then((response) => {
                if(response.status!==200) {
                  throw new Error(response.status)
                }
                return response.json()
            })
            .then((json) => {
                localStorage.setItem('user', JSON.stringify(json));
                this.setState({ username: json.username });
                return json;
            })
            .catch((error) => {
                alert('There has been an error fetching the use, please refresh');
            });
    };

    componentDidMount() {
        this.fetchCurrentUser();
    }

    render() {
        const { username } = this.state;
        return(
            <header className="header">
                <div className="header-inner">
                    <div className="header-title">
                        <span role="img" aria-label="truck-logo">
                            🚚
                        </span>
                        Truckfinder
                    </div>
                    { username !== null
                        ? <div>{username}</div>
                        : <div className="header-buttons">
                            <Link to="/login">Log in</Link>
                        </div>
                    }
                </div>
            </header>
        )
    }
}

export default Header;
