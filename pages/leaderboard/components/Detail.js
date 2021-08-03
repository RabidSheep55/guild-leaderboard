import styles from "../styles/Detail.module.css";

export default function Detail({ data }) {
  const [key, value] = data;
  return (
    <div className={styles.detail}>
      <span className={styles.key}>{key}</span>:{" "}
      <span className={styles.value}>{value}</span>
    </div>
  );
}
