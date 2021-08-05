import Table from "./components/Table";

import fetch from "isomorphic-unfetch";

import styles from "./styles/Leaderboard.module.css";

const Leaderboard = ({ data }) => {
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

  return {
    props: { data: json },
  };
}
