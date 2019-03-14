import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const fetchCurrentUser = async () => {
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
            console.log(json)
            localStorage.setItem('user', JSON.stringify(json));
        })
        .catch((error) => {
            alert('There has been an error fetching the use, please refresh');
        });
}

class Header extends React.Component{
    componentDidMount() {
        fetchCurrentUser();
    }

    render() {
        return(
            <header className="header">
                <div className="header-inner">
                    <div className="header-title">
                        <span role="img" aria-label="truck-logo">
                            🚚
                        </span>
                        Truckfinder
                    </div>
                    <div className="header-buttons">
                        <Link to="/login">Log in</Link>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
