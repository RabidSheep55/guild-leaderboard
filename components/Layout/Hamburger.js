import styles from "./Hamburger.module.css";

const Hamburger = ({ isOpen, onClick }) => {
  return (
    <div
      className={[styles.hamburger, isOpen && styles.active].join(" ")}
      onClick={onClick}
    >
      <div className={styles.box}>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
};

export default Hamburger;
