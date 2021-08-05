import styles from "../styles/Detail.module.css";
import numeral from "numeral";

export default function Detail({ data = [], darker = null }) {
  let [key, value] = data;

  return (
    <div className={[styles.detail, !darker && styles.darker].join(" ")}>
      <span className={styles.key}>{key}</span>:{" "}
      <span className={styles.value}>
        {numeral(value).format("0.00a") || value}
      </span>
    </div>
  );
}
