import styles from './index.module.css';

function ListButtons({type,onClick,btnText,additionalClass}) {
  return (
    <div>
      <button type={type} onClick={onClick} className={`${styles.btn} ${styles[additionalClass]}`}>
        {btnText}
      </button>
    </div>
  );
}

export default ListButtons;
