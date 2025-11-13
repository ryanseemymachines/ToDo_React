import React from "react";
import styles from './index.module.css';

function FormButton(props) {
  return (
    <div>
      <button type={props.type} onClick={props.onClick} className={styles.formBtn}>
        {props.btnText}
      </button>
    </div>
  );
}

export default FormButton;
