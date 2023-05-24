import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from '../config';

import "bootstrap/dist/css/bootstrap.min.css";
import "../login.css"

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
        <div>
            <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
                <div className="container">
                    <div className="card login-card">
                        <div className="row no-gutters">
                            <div className="card-body">
                                <img src="https://i.imgur.com/VpNAWHU.png" width="100" height="100" alt="logo" />
                                <p className="login-card-description">Crear cuenta</p>
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
                                    <input name="login" id="login" className="btn btn-block login-btn mb-4" type="submit" value="Crear cuenta" />
                                </form>
                                <br />
                                <Link className='text-reset' to={"/"}>Inicar sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Signup;
