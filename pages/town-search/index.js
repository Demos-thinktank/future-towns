import fs from "fs";
import path from "path";
import axios from "axios";
// import { connectToDatabase } from "../../util/mongodb";
import Head from "next/head";
import styles from "../../styles/Town-Search.module.css";
import { useState } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import Fade from "react-reveal/Fade";

// export async function getServerSideProps(context) {
//   const { client } = await connectToDatabase()

//   const isConnected = await client.isConnected() // Returns true or false

//   return {
//     props: { isConnected },
//   }
// }

export const getStaticProps = async () => {
  const dbDirectory = path.join(process.cwd(), "./db");
  const filePath = path.join(dbDirectory, "towns.json");
  const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const towns = fileContents.towns.map((val) => val["Town"].toUpperCase());
  const data = fileContents.towns;

  const typologyfilePath = path.join(dbDirectory, "town-typology.json");
  const typologyfileContents = JSON.parse(
    fs.readFileSync(typologyfilePath, "utf8")
  );
  const typologyData = typologyfileContents.types;

  // const { client } = await connectToDatabase();
  // const isConnected = await client.isConnected(); // Returns true or false

  return {
    props: { towns: towns, data, typologyData },
  };
};

export default function TownSearch({
  data,
  towns,
  selectedTownIndex,
  setSelectedTownIndex,
  typologyData,
}) {
  const [townResults, setTownResults] = useState(
    selectedTownIndex || selectedTownIndex === 0 ? data[selectedTownIndex] : ""
  );
  const [error, setError] = useState(false);
  const [voted, setVoted] = useState(false);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function handleChange(e) {
    setError(false);

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

  function handleClick(e) {
    if (e.keyCode == 8) return;
    if (selectedTownIndex || selectedTownIndex === 0) {
      setTownResults(data[selectedTownIndex]);
    } else {
      setError(true);
    }
  }

  async function handleSRTYClick(e) {
    setVoted(true);
    let { value } = e.target;
    const srtyAnswer = {
      town: townResults.Town.toLowerCase(),
      yes: 0,
      no: 0,
    };
    value === "yes" ? (srtyAnswer.yes = 1) : (srtyAnswer.no = 1);
    await axios.post("/api/srty", srtyAnswer);
  }

  let x = townResults && typologyData[townResults["Town Type"].toLowerCase()];

  return (
    <div>
      <Head>
        <title>Future Towns | Town Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/Avenir.ttc" as="font" crossOrigin="" />
      </Head>
      <div className={styles.page}>
        <Nav />
        <main className={styles.main}>
          <div style={{ margin: "auto", maxWidth: "max-content" }}>
            <header className={styles.header}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                }}
              >
                <h1 className={`${styles.h1_size} ${styles.h1}`}>
                  WHAT KIND OF TOWN IS...
                </h1>
                <span
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "max-content",
                  }}
                >
                  <div style={{ display: "flex", maxWidth: "max-content" }}>
                    <input
                      className={`${styles.h1_size} ${styles.town_input}`}
                      type="text"
                      defaultValue={
                        townResults.Town ? townResults.Town.toUpperCase() : ""
                      }
                      list="townlist"
                      name="townlist"
                      onChange={handleChange}
                      onKeyDown={handleClick}
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
                </span>
              </div>
              <p
                style={{
                  display: error ? "block" : "none",
                  color: "#1d3336",
                  margin: "0 auto 0.2rem auto",
                  fontWeight: "900",
                  fontSize: "1.1rem",
                }}
              >
                Sorry, we don't define that place as a town. To find out more
                about how we define towns click here [INSERT LINK TO RELEVANT
                BIT OF PDF REPORT]
              </p>
              {townResults && (
                <Fade>
                  <h2 className={styles.h2}>
                    {townResults.Town.toUpperCase()} IS A
                    {/[aeio]/i.test(townResults["Town Type"].trim()[0]) && "N"}{" "}
                    {townResults["Town Type"].toUpperCase().slice(0, -1)}
                  </h2>
                </Fade>
              )}
            </header>
            {townResults && (
              <Fade>
                <section>
                  <p
                    style={{ margin: "1rem 0px 0.25rem 0", fontSize: "1.2rem" }}
                  >
                    WHAT MAKES A
                    {/[aeio]/i.test(townResults["Town Type"].trim()[0]) && "N"}{" "}
                    {townResults["Town Type"].toUpperCase().slice(0, -1)}?
                  </p>
                  <p style={{ maxWidth: "1200px" }}>
                    {typologyData[townResults["Town Type"].toLowerCase()]}
                  </p>
                  {voted && (
                    <Fade>
                      <p style={{ margin: "1rem 0", fontWeight: "900" }}>
                        THANK YOU!
                      </p>
                    </Fade>
                  )}
                  {!voted && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ margin: "1rem 0", fontWeight: "900" }}>
                        SOUND RIGHT TO YOU?
                      </p>
                      <button
                        className={styles.srty_btn}
                        style={{
                          margin: "0 1ch 0 1.5ch",
                          backgroundColor: "#1d3336",
                        }}
                        value="yes"
                        onClick={handleSRTYClick}
                      >
                        YES
                      </button>
                      <button
                        className={styles.srty_btn}
                        style={{ backgroundColor: "#1d3336" }}
                        value="no"
                        onClick={handleSRTYClick}
                      >
                        NO
                      </button>
                    </div>
                  )}
                </section>
              </Fade>
            )}
            {townResults && (
              <Fade right cascade>
                <section className={styles.container}>
                  {Object.keys(townResults)
                    .slice(1)
                    .map((val, i) => {
                      if (townResults[val])
                        return (
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
                                  textAlign: "center",
                                }}
                              >
                                {val === "Average Age"
                                  ? Math.round(townResults[val])
                                  : val === "Average House Price"
                                  ? `£${numberWithCommas(townResults[val])}`
                                  : val === "Population Size"
                                  ? numberWithCommas(townResults[val])
                                  : townResults[val]}
                              </p>
                              <p
                                style={{
                                  fontSize: "0.75rem",
                                  textAlign: "center",
                                }}
                              >
                                {val === "Average Age"
                                  ? "Average age in England and Wales (2019): 40"
                                  : val === "Average House Price"
                                  ? "Average house price in England (2020): £262,000"
                                  : ""}
                              </p>
                            </div>
                          </section>
                        );
                    })}
                </section>
              </Fade>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
