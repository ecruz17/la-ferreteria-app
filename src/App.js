import React from "react";
import { axiosInstance } from "../src/config";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faClose } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Navbar from "./components/navbar";
import AddProductBtn from "./components/add_product_btn";


const MySwal = withReactContent(Swal)

const initialForm = {
  id: '',
  name: '',
  provider: '',
  price: ''
};

export default class App extends React.Component {

  state = {
    data: [],
    modalInsert: false,
    modalUpdate: false,
    modalDelete: false,
    form: {
      id: '',
      name: '',
      provider: '',
      price: ''
    }
  };

  resetForm = () => {
    this.setState({ form: initialForm });
  }

  handleCancel = () => {
    this.resetForm();
    this.setState({ modalInsert: !this.state.modalInsert });
  }

  handleModalInsert = () => {
    this.setState({ modalInsert: !this.state.modalInsert });
    this.resetForm();
  }

  handleModalUpdate = () => {
    this.setState({ modalUpdate: !this.state.modalUpdate });
  }

  handleModalDelete = () => {
    this.setState({ modalDelete: !this.state.modalDelete });
  }

  showSuccessModal = (action) => {
    MySwal.fire({
      title: <strong>¡Listo!</strong>,
      html: <i>El producto se {action} con éxito</i>,
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
  }

  validateNumber = (event) => {
    if (!/^\d(\.\d)*$/.test(event.key)) {
      this.showErrorModal('Por favor ingresa valores numéricos');
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

  getRequest = () => {
    axiosInstance.get('/products')
      .then(response => {
        this.setState({ data: response.data });
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
          this.showSuccessModal('agregó');
          this.handleModalInsert();
          this.resetForm();
          this.getRequest();
        }
      })
      .catch((err) => console.log(err.message));
  }

  putRequest = () => {
    axiosInstance.put('/products/' + this.state.form.id, this.state.form)
      .then(response => {
        this.showSuccessModal('actualizó');
        this.handleModalUpdate();
        this.getRequest();
      })
      .catch((err) => console.log(err.message));
  }

  deleteRequest = () => {
    axiosInstance.delete('/products/' + this.state.form.id)
      .then(response => {
        this.setState({ modalDelete: false });
        this.showSuccessModal('eliminó');
        this.getRequest();
      })
  }

  componentDidMount() {
    this.getRequest();
  }



  render() {
    const { form } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div id="container">
          <img id="store-img" src="https://images.unsplash.com/photo-1602052793312-b99c2a9ee797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="hardware_store_image" />
          <AddProductBtn id="add-product-style" handleModalInsert={this.handleModalInsert} />
        </div>
        <div>
          <h1 id="products-header">Productos</h1>
          <div className="table-container">
            <div className="table-header">
              <h3 id="table-header-text">Productos en existencia</h3>
            </div>
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
                          <td>{product.provider || '...'}</td>
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
            </div>
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
                  <label htmlFor="provider">{`Proveedor (opcional)`}</label>
                  <input maxLength={40} className="form-control" type="text" name="provider" id="provider" onChange={this.handleInputChange} value={form ? form.provider : ''} />
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
                  <input maxLength={40} className="form-control" type="text" name="provider" id="provider" onChange={this.handleInputChange} value={form ? form.provider : ''} />
                  <br />
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
          </div>
        </div>
        <footer>
          <span>{`© ℗®™ to Emir Cruz Maldonado & Alejandro López Castrejón`}</span>
        </footer>
      </div>
    );
  }
}
