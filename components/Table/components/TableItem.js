import { useState } from "react";
import PropTypes from "prop-types";

import numeral from "numeral";

import Detail from "./Detail";

import styles from "../styles/TableItem.module.css";
import tableStyles from "../styles/Table.module.css";

const TableItem = ({ rank, name, details, points, darker, perc, last }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={[
        styles.container,
        tableStyles.tableSettings,
        darker && styles.darker,
        last && styles.last,
      ].join(" ")}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <div className={[styles.item, styles.rank].join(" ")}>{rank}</div>
      <div className={[styles.item, styles.name].join(" ")}>{name}</div>
      <div
        className={[
          styles.item,
          styles.details,
          isOpen && styles.openDetails,
        ].join(" ")}
      >
        {Object.entries(details)
          .filter((item) => item[1] != 0 && item[1] != null)
          .sort((a, b) => (a[1] <= b[1] ? (a[1] === b[1] ? 0 : 1) : -1))
          .map((item, ind) => (
            <Detail data={item} darker={darker} key={ind} />
          ))}
      </div>
      <div className={[styles.item, styles.points].join(" ")}>
        <span>{numeral(points).format("0.00a") || points}</span>
        <div className={styles.hoverPerc}>{(perc * 100).toFixed(2)} %</div>
      </div>
    </div>
  );
};

TableItem.propTypes = {
  rank: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  details: PropTypes.object,
  points: PropTypes.number.isRequired,
};

TableItem.defaultProps = {
  rank: -1,
  name: "",
  details: "",
  points: 0,
};

export default TableItem;
