import Error from "components/Error";

import LiveTimer from "components/LiveTimer";
import Table from "components/Table";

import fetch from "isomorphic-unfetch";

import styles from "styles/Leaderboard.module.css";

const Leaderboard = ({ data = [], cacheInfo = {}, eventData = {} }) => {
  console.log("Cache Info", cacheInfo);
  console.log(eventData);
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Guild Event Leaderboard</h1>
      <p className={styles.description}>
        View each guild member&apos;s stats relevant to the currently running
        event. Data is updated every 15 minutes
      </p>
      <LiveTimer
        startTime={+new Date(eventData.eventInfo.start_timestamp)}
        endTime={+new Date(eventData.eventInfo.end_timestamp)}
      />
      <Table data={data} />
    </div>
  );
};

export default Leaderboard;

export async function getServerSideProps(context) {
  // Fetch from API
  const res = await fetch(`http://${process.env.VERCEL_URL}/api/leaderboard`);
  const json = await res.json();
  const headers = res.headers;

  // Fetch event data
  const res2 = await fetch(`http://${process.env.VERCEL_URL}/api/event`);
  const json2 = await res2.json();

  return {
    props: {
      data: json,
      cacheInfo: {
        "HIT or Miss": res.headers.get("X-Cache"),
        Age: res.headers.get("X-Cache-Age-s"),
      },
      eventData: json2,
    },
  };
}
