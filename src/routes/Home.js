import React from "react";
import { axiosInstance } from "../config";
// import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import AddProductBtn from "../components/add_product_btn";
import Navbar from "../components/navbar";
import AddProviderBtn from "../components/add_provider_btn";

const MySwal = withReactContent(Swal)

const initialForm = {
    id: '',
    name: '',
    provider: '',
    price: ''
};

const initialFormProvider = {
    id: '',
    name: '',
    address: '',
    phone: '',
    managerName: ''
};

export default class Home extends React.Component {

    state = {
        data: [],
        providers: [],
        modalInsert: false,
        modalProvider: false,
        modalUpdate: false,
        modalProviderUpdate: false,
        modalDelete: false,
        modalProviderDelete: false,
        btnType: 'product',
        form: {
            id: '',
            name: '',
            provider: '',
            price: ''
        },
        providersForm: {
            id: '',
            name: '',
            address: '',
            phone: '',
            managerName: ''
        }
    };

    // constructor(props) {
    //     super(props)
    //     this.myRef = React.createRef();
    // }

    // scrollToProducts(event) {
    //     sessionStorage.setItem("reloading", "true");
    //     window.scrollTo(0, this.myRef.current.offsetTop);
    // }

    resetForm = () => {
        this.setState({ form: initialForm });
        this.setState({ providersForm: initialFormProvider });
    }

    handleCancel = () => {
        this.resetForm();
        this.setState({ modalInsert: !this.state.modalInsert });
    }

    handleCancelProv = () => {
        this.resetForm();
        this.setState({ modalProvider: !this.state.modalProvider });
    }

    handleModalInsert = () => {
        this.setState({ modalInsert: !this.state.modalInsert });
        this.resetForm();
    }

    handleProviderInsert = () => {
        this.setState({ modalProvider: !this.state.modalProvider });
        this.resetForm();
    }

    handleModalUpdate = () => {
        this.setState({ modalUpdate: !this.state.modalUpdate });
    }

    handleModalProviderUpdate = () => {
        this.setState({ modalProviderUpdate: !this.state.modalProviderUpdate });
    }

    handleModalDelete = () => {
        this.setState({ modalDelete: !this.state.modalDelete });
    }

    handleModalProvDelete = () => {
        this.setState({ modalProviderDelete: !this.state.modalProviderDelete });
    }

    handleBtnType = (type) => {
        this.setState({ btnType: type })
    }

    showSuccessModal = (type, action) => {
        MySwal.fire({
            title: <strong>¡Listo!</strong>,
            html: <i>El {type} se {action} con éxito</i>,
            icon: 'success'
        });
    }

    showErrorModal = (message) => {
        MySwal.fire({
            title: <strong>¡Ups!</strong>,
            html: <i>{message}</i>,
            icon: 'error'
        });
    }

    handleInputChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value.toUpperCase()
            }
        });
        console.log(this.state);
    }

    handleInputProvChange = async d => {
        d.persist();
        await this.setState({
            providersForm: {
                ...this.state.providersForm,
                [d.target.name]: d.target.value.toUpperCase()
            }
        });
    }

    validateNumber = (event) => {
        if (!/^\d(\.\d)*$/.test(event.key)) {
            this.showErrorModal('Por favor ingresa valores numéricos sin espacios');
            event.preventDefault();
        }
    }

    selectProduct = (product) => {
        this.setState({
            form: {
                id: product._id,
                name: product.name,
                provider: product.provider,
                price: product.price
            }
        });
    }

    selectProvider = (provider) => {
        this.setState({
            providersForm: {
                id: provider._id,
                name: provider.name,
                address: provider.address,
                phone: provider.phone,
                managerName: provider.managerName
            }
        });
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

    postRequest = async () => {
        await axiosInstance.post('/products', this.state.form)
            .then(response => {
                if (this.state.form.name === '' || this.state.form.price === '') {
                    this.showErrorModal('Por favor, añade información a los campos requeridos');
                }
                else {
                    this.showSuccessModal('producto', 'agregó');
                    this.handleModalInsert();
                    this.resetForm();
                    this.getRequest();
                }
            })
            .catch((err) => console.log(err.message));
    }

    postProvider = async () => {
        await axiosInstance.post('/providers', this.state.providersForm)
            .then(response => {
                if (this.state.providersForm.name === '' ||
                    this.state.providersForm.address === '' ||
                    this.state.providersForm.phone === '' ||
                    this.state.providersForm.managerName === ''
                ) {
                    this.showErrorModal('Por favor, añade información a los campos requeridos');
                }
                else {
                    this.showSuccessModal('proveedor', 'agregó');
                    this.handleProviderInsert();
                    this.resetForm();
                    this.getProviders();
                }
            })
            .catch((err) => console.log(err.message));
    }

    putRequest = () => {
        axiosInstance.put(`/products/${this.state.form.id}`, this.state.form)
            .then(response => {
                this.showSuccessModal('producto', 'actualizó');
                this.handleModalUpdate();
                this.getRequest();
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

    deleteRequest = () => {
        axiosInstance.delete(`/products/${this.state.form.id}`)
            .then(response => {
                this.setState({ modalDelete: false });
                this.showSuccessModal('producto', 'eliminó');
                this.getRequest();
            })
    }

    deleteProvider = () => {
        axiosInstance.delete(`/providers/${this.state.providersForm.id}`)
            .then(response => {
                this.setState({ modalProviderDelete: false });
                this.showSuccessModal('proveedor', 'eliminó');
                this.getProviders();
            })
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
                                    ID
                                </th>
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
                                        <tr id="products-tr">
                                            <td>{product._id.substring(0, 6)}</td>
                                            <td>{(product.name).toUpperCase()}</td>
                                            <td>{product.provider || 'CEMENTOS S.A.'}</td>
                                            <td>{`$${product.price}`}</td>
                                            <td>
                                                <button id="btn-edit" className="btn btn-primary" onClick={() => { this.selectProduct(product); this.handleModalUpdate() }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                {"  "}
                                                <button id="#btn-trash" className="btn btn-danger" onClick={() => { this.selectProduct(product); this.handleModalDelete() }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
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
                                ID
                            </th>
                            <th>
                                Nombre del proveedor
                            </th>
                            <th>
                                Dirección
                            </th>
                            <th>
                                Teléfono
                            </th>
                            <th>
                                Nombre del encargado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.providers.map(provider => {
                            return (
                                <>
                                    <tr id="products-tr">
                                        <td>{provider._id.substring(0, 6)}</td>
                                        <td>{(provider.name).toUpperCase()}</td>
                                        <td>{provider.address.toUpperCase()}</td>
                                        <td>{provider.phone}</td>
                                        <td>{provider.managerName.toUpperCase()}</td>
                                        <td>
                                            <button id="btn-edit" className="btn btn-primary" onClick={() => { this.selectProvider(provider); this.handleModalProviderUpdate() }}>
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            {"  "}
                                            <button id="#btn-trash" className="btn btn-danger" onClick={() => { this.selectProvider(provider); this.handleModalProvDelete() }}>
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
        );
    }

    render() {
        const { form, providersForm } = this.state;
        return (
            <div className="homepage">
                <Navbar changeView={this.handleBtnType} />
                <div className="products-view">
                    <div id="container">
                        <div>{this.imgTypeChange()}</div>
                        <div>{this.btnTypeChange()}</div>
                    </div>
                    <div>
                        <h1 id="products-header">{this.tableHeaderTypeChange()}</h1>
                        <div className="table-container">
                            <div className="table-header">
                                <h3 id="table-header-text">{this.tableHeaderTypeChange()} en existencia</h3>
                            </div>
                            <div>{this.tableContentType()}</div>

                            <Modal isOpen={this.state.modalInsert}>
                                <ModalHeader style={{ display: 'block' }}>
                                    <h2 id="table-header-text" style={{ float: 'left' }}>Registrar nuevo producto</h2>
                                    <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => this.handleCancel()}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre del producto</label>
                                        <input maxLength={40} required className="form-control" type="text" name="name" id="name" onChange={this.handleInputChange} value={form ? form.name : ''} />
                                        <br />
                                        <label htmlFor="provider">{`Proveedor`}</label>
                                        <select name="provider" className="form-control" type="text" id="provider" onChange={this.handleInputChange} value={form ? form.provider : ''}>
                                            {
                                                this.state.providers.map(provider => (
                                                    <option key={provider._id} value={provider.name}>{provider.name}</option>
                                                )
                                                )
                                            }
                                        </select>
                                        <br />
                                        <label required htmlFor="price">Precio</label>
                                        <input min={0} max={6} onKeyPress={(event) => this.validateNumber(event)} className="form-control" type="number" name="price" id="price" onChange={this.handleInputChange} value={form ? form.price : 0} />
                                        <br />
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                    <button className="btn btn-success" onClick={() => this.postRequest()}>Aceptar</button>
                                    <button className="btn btn-danger" onClick={() => this.handleCancel()}>Cancelar</button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.modalProvider}>
                                <ModalHeader style={{ display: 'block' }}>
                                    <h2 id="table-header-text" style={{ float: 'left' }}>Registrar nuevo proveedor</h2>
                                    <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => this.handleCancelProv()}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre del proveedor</label>
                                        <input maxLength={40} required className="form-control" type="text" name="name" id="name" onChange={this.handleInputProvChange} value={providersForm ? providersForm.name : ''} />
                                        <br />
                                        <label htmlFor="address">Dirección</label>
                                        <input maxLength={40} className="form-control" type="text" name="address" id="address" onChange={this.handleInputProvChange} value={providersForm ? providersForm.address : ''} />
                                        <br />
                                        <label required htmlFor="phone">Teléfono</label>
                                        <input min={0} max={10} onKeyPress={(event) => this.validateNumber(event)} className="form-control" type="phone" name="phone" id="phone" onChange={this.handleInputProvChange} value={providersForm ? providersForm.phone : ''} />
                                        <br />
                                        <label htmlFor="managerName">Nombre de encargado</label>
                                        <input maxLength={40} className="form-control" type="text" name="managerName" id="managerName" onChange={this.handleInputProvChange} value={providersForm ? providersForm.managerName : ''} />
                                        <br />
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                    <button className="btn btn-success" onClick={() => this.postProvider()}>Aceptar</button>
                                    <button className="btn btn-danger" onClick={() => this.handleCancelProv()}>Cancelar</button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.modalUpdate}>
                                <ModalHeader style={{ display: 'block' }}>
                                    <h2 id="table-header-text" style={{ float: 'left' }}>Actualizar producto</h2>
                                    <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => this.handleModalUpdate()}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="form-group">
                                        <label htmlFor="name">ID</label>
                                        <input className="form-control" type="text" name="name" id="name" disabled value={form ? form.id : ''} />
                                        <br />
                                        <label htmlFor="name">Nombre del producto</label>
                                        <input maxLength={40} className="form-control" type="text" name="name" id="name" onChange={this.handleInputChange} value={form ? form.name : ''} />
                                        <br />
                                        <label htmlFor="provider">Proveedor</label>
                                        <select name="provider" className="form-control" type="text" id="provider" onChange={this.handleInputChange} value={form ? form.provider : ''}>
                                            {
                                                this.state.providers.map(provider => (
                                                    <option key={provider._id} value={provider.name}>{provider.name}</option>
                                                )
                                                )
                                            }
                                        </select>
                                        <label htmlFor="price">Precio</label>
                                        <input min={0} max={6} onKeyPress={(event) => this.validateNumber(event)} className="form-control" type="text" name="price" id="price" onChange={this.handleInputChange} value={form ? form.price : ''} />
                                        <br />
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                    <button className="btn btn-primary" onClick={() => this.putRequest()}>Actualizar</button>
                                    <button className="btn btn-danger" onClick={() => this.setState({ modalUpdate: false })}>Cancelar</button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.modalProviderUpdate}>
                                <ModalHeader style={{ display: 'block' }}>
                                    <h2 id="table-header-text" style={{ float: 'left' }}>Actualizar proveedor</h2>
                                    <button className="btn btn-danger" style={{ float: 'right' }} onClick={() => this.handleModalProviderUpdate()}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </ModalHeader>
                                <ModalBody>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre del proveedor</label>
                                        <input maxLength={40} required className="form-control" type="text" name="name" id="name" onChange={this.handleInputProvChange} value={providersForm ? providersForm.name : ''} />
                                        <br />
                                        <label htmlFor="address">Dirección</label>
                                        <input maxLength={40} className="form-control" type="text" name="address" id="address" onChange={this.handleInputProvChange} value={providersForm ? providersForm.address : ''} />
                                        <br />
                                        <label required htmlFor="phone">Teléfono</label>
                                        <input min={0} max={10} onKeyPress={(event) => this.validateNumber(event)} className="form-control" type="phone" name="phone" id="phone" onChange={this.handleInputProvChange} value={providersForm ? providersForm.phone : ''} />
                                        <br />
                                        <label htmlFor="managerName">Nombre de encargado</label>
                                        <input maxLength={40} className="form-control" type="text" name="managerName" id="managerName" onChange={this.handleInputProvChange} value={providersForm ? providersForm.managerName : ''} />
                                        <br />
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                    <button className="btn btn-primary" onClick={() => this.putProvider()}>Actualizar</button>
                                    <button className="btn btn-danger" onClick={() => this.setState({ modalProviderUpdate: false })}>Cancelar</button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.modalDelete}>
                                <ModalBody style={{ display: 'block', textAlign: 'center' }}>
                                    <h3>¿Estás seguro de que deseas eliminar el producto: </h3>
                                    <h2>{form && form.name.toUpperCase()}</h2>
                                </ModalBody>
                                <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                    <button className="btn btn-success" onClick={() => this.deleteRequest()}>Muy seguro</button>
                                    <button className="btn btn-danger" onClick={() => this.handleModalDelete()}>Aún no</button>
                                </ModalFooter>
                            </Modal>

                            <Modal isOpen={this.state.modalProviderDelete}>
                                <ModalBody style={{ display: 'block', textAlign: 'center' }}>
                                    <h3>¿Estás seguro de que deseas eliminar el proveedor: </h3>
                                    <h2>{providersForm && providersForm.name.toUpperCase()}</h2>
                                </ModalBody>
                                <ModalFooter style={{ display: 'block', textAlign: 'center' }}>
                                    <button className="btn btn-success" onClick={() => this.deleteProvider()}>Muy seguro</button>
                                    <button className="btn btn-danger" onClick={() => this.handleModalProvDelete()}>Aún no</button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
                <footer>
                    <span>{`© ℗®™ to Emir Cruz Maldonado & Alejandro López Castrejón`}</span>
                </footer>
            </div>
        );
    }
}
