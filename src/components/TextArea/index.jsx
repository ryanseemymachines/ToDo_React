import React from "react";
import './index.css';

function TextArea(props) {
  return (
    <div>
      <textarea
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
