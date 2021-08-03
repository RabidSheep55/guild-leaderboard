import styles from "styles/Home.module.css";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <h1 className={styles.title}>
        <span className={styles.welcome}>Welcome to </span>First Place{" "}
        <span className={styles.emphasis}>Fishing</span>
      </h1>
      <Image
        src="https://thumbs.gfycat.com/InfamousTeemingGuanaco-size_restricted.gif"
        alt="Minecraft fishing gif"
        width={500}
        height={266}
      />
    </>
  );
};

export default Home;
