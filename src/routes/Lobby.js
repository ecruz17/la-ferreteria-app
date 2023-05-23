import React from 'react'
import { Link } from 'react-router-dom';

function Lobby() {
    return (
        <div>
            <h1>¡Gracias!</h1>
            <h3>Un administrador te notificará cuando se active tu cuenta</h3>
            <br />
            <br />
            <Link to={"/"}>Iniciar sesión</Link>
        </div>
    )
}

export default Lobby;