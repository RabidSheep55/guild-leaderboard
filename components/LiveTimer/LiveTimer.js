import { useState } from "react";

import Moment from "react-moment";

import styles from "./LiveTimer.module.css";

// Start and endTime to be given in epoch ms
const LiveTimer = ({ startTime, endTime }) => {
  const [cur, setCur] = useState(+new Date());

  if (cur <= startTime) {
    return (
      <div className={styles.card}>
        <span>Event starting in </span>
        <Moment
          duration={cur}
          date={startTime}
          durationFromNow
          interval={1000}
          onChange={() => setCur(+new Date())}
          className={styles.moment}
        />
      </div>
    );
  } else if (cur <= endTime) {
    return (
      <div className={styles.card}>
        <span>Event ending in </span>
        <Moment
          duration={cur}
          date={endTime}
          interval={1000}
          onChange={() => setCur(+new Date())}
          className={styles.moment}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.card}>
        <span>Event ended </span>
        <Moment
          date={endTime}
          durationFromNow
          interval={1000}
          className={styles.moment}
        />
        <span> ago</span>
      </div>
    );
  }
};

export default LiveTimer;
