import React from "react";
import { Link } from "react-router-dom";
import "../App.css";


const Header = () => (
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
);

export default Header;
