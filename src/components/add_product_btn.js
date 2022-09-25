import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const AddProductBtn = (props) => {
    const [btnContent, setBtnContent] = useState("Añadir Producto");

    return (
        <button
            id="btnAddProduct"
            className="btn btn-primary"
            onClick={props.handleModalInsert}
            onMouseOver={() => setBtnContent("+")}
            onMouseLeave={() => setBtnContent("Añadir Producto")}
        >
            {btnContent}
        </button>
    );
};

export default AddProductBtn;
