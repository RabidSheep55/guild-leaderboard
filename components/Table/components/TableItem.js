import { useState } from "react";
import PropTypes from "prop-types";

import Detail from "./Detail";

import styles from "../styles/TableItem.module.css";
import tableStyles from "../styles/Table.module.css";

const TableItem = ({ rank, name, details, points, darker, last }) => {
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
        {Object.entries(details).map((item, ind) => (
          <Detail data={item} darker={darker} key={ind} />
        ))}
      </div>
      <div className={[styles.item, styles.points].join(" ")}>{points}</div>
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