import React from "react";
import styles from './index.module.css';

function TextInput(props) {
  const {type,name,placeholder,value,min,onChange}=props
  return (
    <div>
      <input className={styles.textInput}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        min={min}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
