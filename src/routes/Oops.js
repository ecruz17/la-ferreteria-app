import React from 'react'
import { Link } from 'react-router-dom';

function Oops() {
    return (
        <div>
            <h1>¡Ni modo!</h1>
            <img src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80" alt="nimodo" />
            <h3>Crea otra cuenta o notifícaselo a un administrador</h3>
            <br />
            <Link to={"/"}>Iniciar sesión</Link>
        </div>
    )
}

export default Oops;