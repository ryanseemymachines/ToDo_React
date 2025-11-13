import React from "react";
import styles from './index.module.css';

function DateInput({ type, name, value, min, onChange }) {
  return (
    <div>
      <input className={styles.dateInput}
        type={type}
        name={name}
        value={value}
        min={min}
        onChange={onChange}
      />
    </div>
  );
}

export default DateInput;
