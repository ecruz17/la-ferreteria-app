import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faCancel } from '@fortawesome/free-solid-svg-icons';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Auth() {

    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);

    const fetchData = async () => {
        try {
            const responseUsers = await axiosInstance.get(`/users`);
            const responseEmployees = await axiosInstance.get(`/employees`);
            setUsers(responseUsers.data);
            setEmployees(responseEmployees.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        axiosInstance.delete(`/users/${id}`)
            .then(response => {
                alert('Usuario eliminado');
                fetchData();
            })
    }

    const handleDeauth = (id) => {
        axiosInstance.delete(`/employees/${id}`)
            .then(response => {
                alert('Empleado eliminado');
                fetchData();
            })
    }

    const handleAuthorize = (user) => {
        axiosInstance.post(`/employees`, user)
            .then(response => {
                alert(`Usuario ${user.email} autorizado`);
                handleDelete(user._id);
                fetchData();
            });
    }

    return (
        <div>
            <Link to={'/home'}>Regresar a la página principal </Link>
            <h2 id="products-header">Usuarios</h2>
            <div className="table-container">
                <div className="table-header">
                    <h3 id="table-header-text">Usuarios por autorizar</h3>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                return (
                                    <>
                                        <tr id="users-tr">
                                            <td>{user._id.substring(0, 6)}</td>
                                            <td>{(user.email)}</td>
                                            <td>
                                                <button id="btn-authorize" className="btn btn-primary" onClick={() => handleAuthorize(user)}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>
                                                {"  "}
                                                <button id="#btn-trash" className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                                                    <FontAwesomeIcon icon={faCancel} />
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <h2 id="products-header">Empleados</h2>
            <div className="table-container">
                <div className="table-header">
                    <h3 id="table-header-text">Empleados</h3>
                </div>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => {
                                return (
                                    <>
                                        <tr id="users-tr">
                                            <td>{employee._id.substring(0, 6)}</td>
                                            <td>{(employee.email)}</td>
                                            <td>
                                                <button id="#btn-trash" className="btn btn-secondary" onClick={() => handleDeauth(employee._id)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Auth;