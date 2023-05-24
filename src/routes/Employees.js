import React from "react";
import { axiosInstance } from "../config";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AddProductBtn from "../components/add_product_btn";
import NavbarEmployees from "../components/navbar_employee";
import AddProviderBtn from "../components/add_provider_btn";

const initialFormEmployee = {
    id: '',
    email: '' 
}

export default class Employees extends React.Component {

    state = {
        data: [],
        providers: [],
        modalEmployeeDelete: false,
    };

    deleteEmployee = () => {
        axiosInstance.delete(`/employees/${this.employeesForm.id}`)
        .then(response => {
            this.setState({ modalEmployeeDelete: false });
                this.showSuccessModal('empleado', 'eliminó');
                this.getEmployees();
        })
    }

    handleBtnType = (type) => {
        this.setState({ btnType: type })
    }

    getRequest = () => {
        axiosInstance.get('/products')
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch((err) => console.log(err.message));
    }

    getProviders = () => {
        axiosInstance.get('/providers')
            .then(response => {
                this.setState({ providers: response.data });
            })
            .catch((err) => console.log(err.message));
    }

    putProvider = () => {
        axiosInstance.put(`/providers/${this.state.providersForm.id}`, this.state.providersForm)
            .then(response => {
                this.showSuccessModal('proveedor', 'actualizó');
                this.handleModalProviderUpdate();
                this.resetForm();
                this.getProviders();
            })
            .catch((err) => console.log(err.message));
    }

    componentDidMount() {
        this.getRequest();
        this.getProviders();
    }

    btnTypeChange = () => {
        if (this.state.btnType === 'product') {
            return <AddProductBtn handleModalInsert={this.handleModalInsert} />
        }
        return <AddProviderBtn handleModalInsert={this.handleProviderInsert} />
    }

    imgTypeChange = () => {
        if (this.state.btnType === 'product') {
            return <img id="store-img" src="https://images.unsplash.com/photo-1602052793312-b99c2a9ee797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="hardware_store_image" />
        }
        return <img id="store-img" src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="providers_img" />
    }

    tableHeaderTypeChange = () => {
        if (this.state.btnType === 'product') {
            return 'Productos'
        }
        return 'Proveedores'
    }

    tableContentType = () => {
        if (this.state.btnType === 'product') {
            return (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    Nombre del producto
                                </th>
                                <th>
                                    Proveedor
                                </th>
                                <th>
                                    Precio
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map(product => {
                                return (
                                    <>
                                        <tr key={product._id} id="products-tr">
                                            <td>{(product.name).toUpperCase()}</td>
                                            <td>{product.provider || 'CEMENTOS S.A.'}</td>
                                            <td>{`$${product.price}`}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                </div>);
        }
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                Nombre del proveedor
                            </th>
                            <th>
                                Dirección
                            </th>
                            <th>
                                Teléfono
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.providers.map(provider => {
                            return (
                                <>
                                    <tr key={provider._id} id="products-tr">
                                        <td>{(provider.name).toUpperCase()}</td>
                                        <td>{provider.address.toUpperCase()}</td>
                                        <td>{provider.phone}</td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const { form, employeesForm } = this.state;
        return (
            <div className="homepage">
                <NavbarEmployees changeView={this.handleBtnType} />
                <div className="products-view">
                    <div id="container">
                        <div>{this.imgTypeChange()}</div>
                        <div id="employees-table">
                            <h1 style={{ color: '#000000' }} id="products-header">{this.tableHeaderTypeChange()}</h1>
                            <div className="table-container">
                                <div className="table-header">
                                    <h3 id="table-header-text">{this.tableHeaderTypeChange()} en existencia</h3>
                                </div>
                                <div>{this.tableContentType()}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.modalEmployeeDelete}>
                                <ModalBody style={{ display: 'block', textAlign: 'center' }}>
                                    <h3>¿Estás seguro de que deseas eliminar el empleado?: </h3>
                                    <h2>{employeesForm && employeesForm.name.toUpperCase()}</h2>
                                </ModalBody>
                                <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                    <button className="btn btn-success" onClick={() => this.deleteEmployee()}>Muy seguro</button>
                                    <button className="btn btn-danger" onClick={() => this.handleModalProvDelete()}>Aún no</button>
                                </ModalFooter>
                            </Modal>
                <footer>
                    <span>{`© ℗®™ to Emir Cruz Maldonado & Alejandro López Castrejón`}</span>
                </footer>
            </div>
        );
    }
}
