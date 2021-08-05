import styles from "../styles/StatCard.module.css";

const StatCard = ({ data }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.display_name}</h2>
      <p className={styles.description}>{data.description}</p>
      <div className={styles.weight}>
        <p>{data.weight}</p>
      </div>
      <div className={styles.moreInfo}>
        <div className={styles.infoItem}>
          <span className={styles.key}>_id:</span>
          <span className={styles.value}>{data._id}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.key}>display_name:</span>
          <span className={styles.value}>{data.display_name}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.key}>Path:</span>
          <span className={styles.value}>{data.profile_path}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
