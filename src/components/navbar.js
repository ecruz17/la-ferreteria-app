import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../index.css';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand">
                    <img src="https://i.imgur.com/VpNAWHU.png" width="40" height="40" className="d-inline-block align-top" alt="" />
                    La Ferretería
                </div>

                <ul id="centerNavbarText" className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#products-header">Productos</a>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;