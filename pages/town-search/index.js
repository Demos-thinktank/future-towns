import fs from "fs";
import path from "path";
import axios from "axios";
// import { connectToDatabase } from "../../util/mongodb";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../../styles/Town-Search.module.css";
// import data from "../db/towns";
import { useEffect, useState } from "react";
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
  const typologyfileContents = JSON.parse(fs.readFileSync(typologyfilePath, "utf8"));
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
  typologyData
}) {
  // console.log(data[selectedTownIndex].Town);
  // console.log(data, towns);


  const [townResults, setTownResults] = useState(
    selectedTownIndex || selectedTownIndex === 0 ? data[selectedTownIndex] : ""
  );
  const [error, setError] = useState(false);
  const [voted, setVoted] = useState(false);

  // console.log(townResults, "tr");
  // const router = useRouter();

  // useEffect(() => {
  //   if (!townResults) {
  //     return router.push("/");
  //   }
  // }, []);

  function handleChange(e) {
    setError(false);
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

  function handleClick(e) {
    if(e.keyCode == 8) return
    if (selectedTownIndex || selectedTownIndex === 0) {
      setTownResults(data[selectedTownIndex]);
    }  
     else {
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
    // .then((res) => console.log(res.data));
  }

    let x = townResults && typologyData[townResults["Town Type"].toLowerCase()]
  console.log('bi',x)
  // console.log(typologyData['Rural towns'])
  // console.log(townResults && townResults["Town Type"].toLowerCase())

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
          <header className={styles.header}>
            {/* <div style={{width: 'max-content'}}> */}
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
              {/* {townResults && ( */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", maxWidth: "100%" }}>
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
                <div
                  style={{
                    visibility: error ? "visible" : "hidden",
                    textAlign: "center",
                    color: "#1d3336",
                    // marginBottom: "1rem",
                    // marginRight: "2.8rem",
                    fontWeight: "900",
                    fontSize: "1.1rem",
                  }}
                >
                  Please try again!
                </div>
              </div>
              {/* // )} */}
            </div>

            {/* </div> */}
            {townResults && (
              <Fade>
                <h2 className={styles.h2}>
                  {townResults.Town.toUpperCase()} IS A{/[aeiou]/i.test(townResults["Town Type"].trim()[0]) && "N"} {townResults["Town Type"].toUpperCase().slice(0, -1)}
                </h2>
              </Fade>
            )}
          </header>
          {townResults && (
            <Fade>
              <section>
                <p style={{ margin: "1.5rem 0px 0.25rem 0", fontSize: "1.2rem" }}>
                  WHAT MAKES A{/[aeiou]/i.test(townResults["Town Type"].trim()[0]) && "N"} {townResults["Town Type"].toUpperCase().slice(0, -1)}?
                </p>
                <p>
                  {typologyData[(townResults["Town Type"].toLowerCase())]}
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
                        color: "#ee7155",
                      }}
                      value="yes"
                      onClick={handleSRTYClick}
                    >
                      YES
                    </button>
                    <button
                      className={styles.srty_btn}
                      style={{ backgroundColor: "#1d3336", color: "#ee7155" }}
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
                    if(townResults[val])
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
                  )})}
              </section>
            </Fade>
          )}
          {/* {isConnected ? (
            <h2 className="subtitle">You are connected to MongoDB</h2>
          ) : (
            <h2 className="subtitle">
              You are NOT connected to MongoDB. Check the <code>README.md</code>{" "}
              for instructions.
            </h2>
          )} */}
        </main>
        <Footer />
      </div>
    </div>
  );
}
