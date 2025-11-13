import styles from './index.module.css';

function TextInput(props) {
  const {type,name,placeholder,value,onChange}=props
  return (
    <div>
      <input className={styles.textInput}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;
