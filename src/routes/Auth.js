import React, { useState, useEffect } from "react";
import { axiosInstance } from "../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faCheck, faCancel, faClose } from '@fortawesome/free-solid-svg-icons';
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';

function Auth() {

    const [users, setUsers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalEmployee, setModalEmployee] = useState(false);

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
                setModal(false);
                fetchData();
            })
    }

    const handleDeauth = (id) => {
        axiosInstance.delete(`/employees/${id}`)
            .then(response => {
                alert(`Usuario desautorizado`);
                setModalEmployee(false);
                fetchData();
            })
    }

    const handleAuthorize = (user) => {
        axiosInstance.post(`/employees`, user)
            .then(response => {
                alert(`Usuario ${user.email} autorizado`);
                setModal(false);
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
                                                <button id="btn-authorize" className="btn btn-primary" onClick={() => setModal(true)}>
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </button>
                                                {"  "}
                                                <button id="#btn-trash" className="btn btn-danger" onClick={() => setModalDelete(true)}>
                                                    <FontAwesomeIcon icon={faCancel} />
                                                </button>
                                            </td>
                                        </tr>
                                        <Modal isOpen={modal}>
                                            <ModalHeader style={{ display: 'block' }}>
                                                <h2 id="table-header-text" style={{ float: 'left' }}>¿Estás seguro que quieres autorizar al usuario {user.email}?</h2>
                                                <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => setModal(false)}>
                                                    <FontAwesomeIcon icon={faClose} />
                                                </button>
                                            </ModalHeader>
                                            <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                                <button className="btn btn-success" onClick={() => handleAuthorize(user)}>Aceptar</button>
                                                <button className="btn btn-danger" onClick={() => setModal(false)}>Cancelar</button>
                                            </ModalFooter>
                                        </Modal>
                                        <Modal isOpen={modalDelete}>
                                            <ModalHeader style={{ display: 'block' }}>
                                                <h2 id="table-header-text" style={{ float: 'left' }}>¿Estás seguro que quieres eliminar al usuario {user.email}?</h2>
                                                <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => setModalDelete(false)}>
                                                    <FontAwesomeIcon icon={faClose} />
                                                </button>
                                            </ModalHeader>
                                            <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                                <button className="btn btn-success" onClick={() => handleDelete(user._id)}>Aceptar</button>
                                                <button className="btn btn-danger" onClick={() => setModal(false)}>Cancelar</button>
                                            </ModalFooter>
                                        </Modal>
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
                                return employee.role === '2' ? (
                                    <>
                                        <tr id="users-tr">
                                            <td>{employee._id.substring(0, 6)}</td>
                                            <td>{(employee.email)}</td>
                                            <td>
                                                <button id="#btn-trash" className="btn btn-secondary" onClick={() => setModalEmployee(true)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                        <Modal isOpen={modalEmployee}>
                                            <ModalHeader style={{ display: 'block' }}>
                                                <h2 id="table-header-text" style={{ float: 'left' }}>¿Estás seguro que quieres desautorizar al empleado {employee.email}?</h2>
                                                <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => setModalEmployee(false)}>
                                                    <FontAwesomeIcon icon={faClose} />
                                                </button>
                                            </ModalHeader>
                                            <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                                <button className="btn btn-success" onClick={() => handleDeauth(employee._id)}>Aceptar</button>
                                                <button className="btn btn-danger" onClick={() => setModalEmployee(false)}>Cancelar</button>
                                            </ModalFooter>
                                        </Modal>
                                    </>
                                ) : <div></div>
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Auth;