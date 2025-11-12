import React from "react";
import './index.css';

function Input(props) {
  const {type,name,placeholder,value,min,onChange}=props
  return (
    <div>
      
      <input
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

export default Input;
