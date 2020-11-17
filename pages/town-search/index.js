import fs from "fs";
import path from "path";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Town-Search.module.css";
// import data from "../db/towns";
import { useEffect, useState } from "react";
import Nav from "../../components/Nav";

export const getStaticProps = async () => {
  const dbDirectory = path.join(process.cwd(), "./db");
  const filePath = path.join(dbDirectory, "towns.json");
  const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const towns = fileContents.towns.map((val) => val["Town"].toUpperCase());
  const data = fileContents.towns;

  return {
    props: { towns: towns, data },
  };
};

export default function TownSearch({
  data,
  towns,
  selectedTownIndex,
  setSelectedTownIndex,
}) {
  // console.log(data[selectedTownIndex].Town);
  // console.log(data, towns);

  const [townResults, setTownResults] = useState(
    selectedTownIndex || selectedTownIndex === 0 ? data[selectedTownIndex] : ""
  );

  // console.log(townResults, "tr");
  const router = useRouter();

  useEffect(() => {
    if (!townResults) {
      return router.push("/");
    }
  }, []);

  function handleChange(e) {
    // setError(false);
    // input box border color

    var d = document
      .getElementById("townlist")
      .options.namedItem(e.target.value.toUpperCase());

    if (d) {
      // console.log(d.getAttribute("data-id"));
      return setSelectedTownIndex(parseInt(d.getAttribute("data-id")));
    } else {
      return setSelectedTownIndex(null);
    }
  }

  function handleClick() {
    if (selectedTownIndex || selectedTownIndex === 0) {
      setTownResults(data[selectedTownIndex]);
    } else {
      setError(true);
    }
  }

  if (!townResults) {
    return <div className={styles.loading}></div>;
  }

  return (
    <div>
      <Head>
        <title>Future Towns | Town Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/Avenir.ttc" as="font" crossOrigin="" />
      </Head>
      <div
        className={styles.page}
      >
        <Nav />
        <main className={styles.main}>
          <header className={styles.header}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <h1 className={`${styles.h1_size} ${styles.h1}`}>
                WHAT KIND OF TOWN IS...
              </h1>
              <div style={{ display: "flex", maxWidth: "100%" }}>
                <input
                  className={`${styles.h1_size} ${styles.town_input}`}
                  type="text"
                  defaultValue={townResults.Town.toUpperCase()}
                  list="townlist"
                  name="townlist"
                  onChange={handleChange}
                />
                <datalist id="townlist">
                  {towns.map((val, i) => (
                    <option id={val} value={val} key={i} data-id={i} />
                  ))}
                </datalist>
                <button
                  style={{
                    backgroundColor: "transparent",
                    padding: "0.25rem",
                    borderRadius: "0 5px 5px 0",
                    border: "1px solid black",
                  }}
                  onClick={handleClick}
                >
                  <img src="/images/search.svg" />
                </button>
              </div>
            </div>
            <h2 className={styles.h2}>{townResults.Town} is a [RURAL TOWN]</h2>
          </header>
          <section>
            <p style={{ margin: "0.25rem 0", fontSize: "1.2rem" }}>
              WHAT MAKES A [RURAL TOWN?]
            </p>
            <p>
              [Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.]
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "1rem 0", fontWeight: "900" }}>
                SOUND RIGHT TO YOU?{" "}
              </p>
              <button
                className={styles.srty_btn}
                style={{ margin: "0 1ch 0 1.5ch" }}
              >
                YES
              </button>
              <button className={styles.srty_btn}>NO</button>
            </div>
          </section>
          <section className={styles.container}>
            {Object.keys(townResults)
              .slice(1)
              .map((val, i) => (
                <section className={styles.card} key={i}>
                  <div className={styles.card_image_div}>
                    <img
                      className={styles.card_image}
                      src={`/images/${val
                        .toLowerCase()
                        .replace(/ /g, "-")}.svg`}
                    />
                  </div>
                  <div className={styles.card_text}>
                    <h3 style={{ textAlign: "center" }}>{val}</h3>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        color: "#ee7155",
                        fontWeight: "bolder",
                        // WebkitTextStroke: '0.15px black'
                      }}
                    >
                      {townResults[val]}
                    </p>
                    {/* <div > */}
                    {/* <button
                      className={styles.card_text_btn_div}
                      // style={{ margin: "0.5rem", transform: "rotate(-20deg)" }}
                    >
                      <img src="/images/see-more.svg" />
                    </button> */}
                    {/* </div> */}
                  </div>
                  {/* <div style={{ position: "relative" }}>
                  
                </div> */}
                </section>
              ))}
          </section>
        </main>
      </div>
    </div>
  );
}
