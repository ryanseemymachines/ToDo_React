import React from "react";
import './index.css';

function ListButtons(props) {
  return (
    <div>
      <button type={props.type} onClick={props.onClick} className={props.className}>
        {props.btnText}
      </button>
    </div>
  );
}

export default ListButtons;
