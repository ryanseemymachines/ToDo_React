import React from "react";
import styles from './index.module.css';

function TextArea(props) {
  return (
    <div>
      <textarea className={styles.textAreaInput}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default TextArea;
