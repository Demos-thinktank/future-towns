import fs from "fs";
import path from "path";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export const getStaticProps = async () => {
  const dbDirectory = path.join(process.cwd(), "./db");
  const filePath = path.join(dbDirectory, "towns.json");
  const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const towns = fileContents.towns.map((val) => val["Town"]);
  return {
    props: { towns: towns },
  };
};

export default function Home({
  towns,
  selectedTownIndex,
  setSelectedTownIndex,
}) {
  const [error, setError] = useState(false);

  const router = useRouter();

  function handleChange(e) {
    // console.log(e.target.value);
    setError(false);

    var el = document
      .getElementById("townlist")
      .options.namedItem(e.target.value);

    if (el) {
      console.log(el.getAttribute("data-id"));
      setSelectedTownIndex(parseInt(el.getAttribute("data-id")));
    } else {
      setSelectedTownIndex(null);
    }
  }

  function handleClick() {
    if (selectedTownIndex || selectedTownIndex === 0) {
      router.push("/town-search");
    } else {
      setError(true);
    }
  }

  // useEffect(() => {
  //   console.log("stindex", selectedTownIndex);
  // }, [selectedTownIndex]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Future Towns</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ margin: "auto", width: "max-content" }}>
          <span style={{ marginRight: "1rem" }}>Search for your town...</span>
          <button onClick={handleClick}>&#128269;</button>
          <input list="townlist" name="townlist" onChange={handleChange} />
          <datalist id="townlist">
            {towns.map((val, i) => (
              <option id={val} value={val} key={i} data-id={i} />
            ))}
          </datalist>
        </div>
        {error && <div>Please try again</div>}
      </main>
    </div>
  );
}
