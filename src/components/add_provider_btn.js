import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const AddProviderBtn = (props) => {
    const [btnContent, setBtnContent] = useState("Añadir Proveedor");

    return (
        <button
            id="btnAddProduct"
            className="btn btn-primary"
            onClick={props.handleModalInsert}
            onMouseOver={() => setBtnContent("+")}
            onMouseLeave={() => setBtnContent("Añadir Proveedor")}
        >
            {btnContent}
        </button>
    );
};

export default AddProviderBtn;
