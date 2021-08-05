import TableItem from "./components/TableItem";

import styles from "./styles/Table.module.css";

const Table = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={[styles.headers, styles.tableSettings].join(" ")}>
        <div className={[styles.header, styles.rankHeader].join(" ")}>Rank</div>
        <div className={[styles.header, styles.nameHeader].join(" ")}>
          Username
        </div>
        <div className={[styles.header, styles.detailsHeader].join(" ")}>
          Details
        </div>
        <div className={[styles.header, styles.pointsHeader].join(" ")}>
          Points
        </div>
      </div>
      {data &&
        data.map((item, index) => (
          <TableItem
            key={index}
            rank={item.rank}
            name={item.username}
            details={item.details}
            points={item.points}
            darker={index % 2 === 0}
            last={index === data.length - 1}
          />
        ))}
    </div>
  );
};

export default Table;
