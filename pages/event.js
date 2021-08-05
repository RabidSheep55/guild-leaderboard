import Error from "components/Error";

import StatCard from "components/StatCard";

import styles from "styles/Event.module.css";

const Event = ({ cacheInfo = {}, data = {} }) => {
  console.log("Cache Info", cacheInfo);
  const { pointParams, eventInfo } = data;

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>{eventInfo.title}</h1>
      <p className={styles.description}>
        {eventInfo.description}{" "}
        <span>
          Shown below are all the tracked stats, and their associated weights
          for the points system
        </span>
      </p>
      <div className={styles.statsContainer}>
        {pointParams.map((item, ind) => (
          <div className={styles.cardContainer} key={ind}>
            <StatCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;

export async function getServerSideProps(context) {
  // Fetch from API
  const res = await fetch(`http://${process.env.VERCEL_URL}/api/event`);
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
