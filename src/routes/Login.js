import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config';
import { LoggedInContext } from '../helper/Context';

import "bootstrap/dist/css/bootstrap.min.css";
import "../login.css"


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setLoggedIn } = useContext(LoggedInContext);
    const history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance.post(`/employees/login`, { email: email, password: password })
            .then(data => {
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
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="card-body">
                                <img src="https://i.imgur.com/VpNAWHU.png" width="100" height="100" alt="logo" />
                                <p className="login-card-description">Iniciar sesión</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="sr-only">Email</label>
                                        <input
                                            type="email" name="email" id="email" className="form-control"
                                            placeholder='Email'
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <label className="sr-only">Contraseña</label>
                                        <input type="password" name="password" id="password" className="form-control" placeholder="***********"
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                    </div>
                                    <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Iniciar sesión" />
                                </form>
                                <a href="/oops" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
                                <br />
                                <Link className='text-reset' to={"/signup"}>Crea una cuenta aquí</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    );
}

export default Login;