import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../index.css';

const Navbar = (props) => {
    return (
        <>
            <nav id="navBarMain" class="navbar navbar-expand-lg sticky-top justify-content-between">
                <div className="row">
                    <div id="col_brand" className="col-4">
                        <img src="https://i.imgur.com/VpNAWHU.png" width="40" height="40" alt="logo" />
                    </div>
                    <div className="col-8 d-none d-md-block align-items-center">
                        <a id="navBarTitle" class="navbar-brand" href="#!">La Ferretería</a>
                    </div>
                </div>
                <a id="navbar_anchor" className="nav-link" href="#!" onClick={() => props.changeView('product')}>Productos</a>
                <a id="navbar_anchor2" className="nav-link" href="#!" onClick={() => props.changeView('provider')}>Proveedores</a>
            </nav>
        </>
    );
}

export default Navbar;