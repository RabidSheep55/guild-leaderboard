import styles from "./Error.module.css";

const Error = ({ text }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Error</h1>
      <p className={styles.description}>{text}</p>
    </div>
  );
};

export default Error;
