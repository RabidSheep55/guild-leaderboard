import Error from "components/Error";

import Table from "components/Table";

import fetch from "isomorphic-unfetch";

import styles from "styles/Leaderboard.module.css";

const Leaderboard = ({ data = [], cacheInfo = {} }) => {
  console.log("Cache Info", cacheInfo);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Guild Event Leaderboard</h1>
      <p className={styles.description}>
        View each guild member&apos;s stats relevant to the currently running
        event. Data is updated every 15 minutes
      </p>
      <Table data={data} />
    </div>
  );
};

export default Leaderboard;

export async function getServerSideProps(context) {
  // Fetch from API
  const res = await fetch("http://localhost:3000/api/leaderboard");
  const json = await res.json();
  const headers = res.headers;

  return {
    props: {
      data: json,
      cacheInfo: {
        "HIT or Miss": res.headers.get("X-Cache"),
        Age: res.headers.get("X-Cache-Age-s"),
      },
    },
  };
}
