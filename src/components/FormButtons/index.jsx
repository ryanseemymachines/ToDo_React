import React from "react";
import "./index.css";

function FormButton(props) {
  return (
    <div>
      <button type={props.type} onClick={props.onClick} className="form-button">
        {props.btnText}
      </button>
    </div>
  );
}

export default FormButton;
