import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';
import { LoggedInContext } from '../helper/Context';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedIn } = useContext(LoggedInContext);
    const history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post(`/employees/login`, { email: email, password: password })
            .then(data => {
                console.log(data);
                if (data.data.status === 400) {
                    alert('El email y la contraseña son requeridos')
                } else if (data.data.status === 404) {
                    alert('Cuenta no encontrada');
                } else if (data.data.status === 401) {
                    alert('Contraseña incorrecta');
                } else if (data.data.status === 202) {
                    history('/home');
                    setLoggedIn(true);
                } else if (data.data.status === 200) {
                    history('/employees');
                    setLoggedIn(true);
                }
                else {
                    alert('Error de servidor');
                }
            });
    }

    return (
        <div>
            <h1>Iniciar Sesión</h1>
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

                <button type="submit">Login</button>
            </form>
            <br />
            <p>O</p>
            <br />
            <Link to={"/signup"}>Crear cuenta</Link>
        </div >
    );
}

export default Login;