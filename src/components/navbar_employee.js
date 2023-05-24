import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoggedInContext } from '../helper/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalFooter } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../index.css';

function NavbarEmployees(props) {
    const { setLoggedIn } = useContext(LoggedInContext)
    const [modal, setModal] = useState(false);

    const handleLogOut = (state) => {
        setLoggedIn(state);
        setModal(false);
        navigate('/');
    }
    const navigate = useNavigate();
    return (
        <>
            <nav id="navBarMain" className="navbar navbar-expand-lg sticky-top justify-content-between">
                <div className="row">
                    <div id="col_brand" className="col-4">
                        <img src="https://i.imgur.com/VpNAWHU.png" width="40" height="40" alt="logo" />
                    </div>
                    <div className="col-8 d-none d-md-block align-items-center">
                        <a id="navBarTitle" className="navbar-brand" href="#!">La Ferretería</a>
                    </div>
                </div>
                <button id="navbar_anchor" className="nav-link" onClick={() => props.changeView('product')}>Productos</button>
                <button id="navbar_anchor2" className="nav-link" onClick={() => props.changeView('provider')}>Proveedores</button>
                <button id="navbar_anchor" className="nav-link" onClick={() => { setModal(true) }}>Cerrar Sesión</button>
                <Modal isOpen={modal}>
                    <ModalHeader style={{ display: 'block' }}>
                        <h2 id="table-header-text" style={{ float: 'left' }}>¿Estás seguro que quieres cerrar sesión?</h2>
                        <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => setModal(false)}>
                            <FontAwesomeIcon icon={faClose} />
                        </button>
                    </ModalHeader>
                    <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                        <button className="btn btn-success" onClick={() => handleLogOut(false)}>Aceptar</button>
                        <button className="btn btn-danger" onClick={() => setModal(false)}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </nav>
        </>
    );
}

export default NavbarEmployees;