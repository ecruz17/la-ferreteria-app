import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from '../config';

function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post('/users', { email: email, password: password })
            .then((data) => {
                if (data.data.status === 400) {
                    alert('Se requiere el email y la contraseña');
                } else if (data.data.status === 409) {
                    alert('Usuario ya registrado');
                }
                else if (data.data.status === 201) {
                    navigate('/lobby');
                }
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className="signup">
            <h1>Crear Cuenta</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    placeholder='Email'
                    onChange={(e) => { setEmail(e.target.value) }}
                />

                <label>Password:</label>
                <input
                    type="password"
                    placeholder='Password'
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <button type="submit">Crear cuenta</button>
            </form>

            <br />
            <p>O</p>
            <br />
            <Link to={"/"}>Iniciar sesión</Link>
        </div>
    );
}

export default Signup;
