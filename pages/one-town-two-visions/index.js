import fs from "fs";
import path from "path";
import Head from "next/head";
import Nav from "../../components/Nav";
// import { useRouter } from "next/router";
import styles from "../../styles/One-Town-Two-Visions.module.css";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Fade";
// import GaugeChart from "react-gauge-chart";
// import "react-gauge-chart/dist/GaugeChart/style.css";
import { useEffect, useState } from "react";
// import Questionnaire from "../../components/Questionnaire";
import Gauge from "../../components/Gauge";

export const getStaticProps = async () => {
  const dbDirectory = path.join(process.cwd(), "./db");
  const filePath = path.join(dbDirectory, "polis.json");
  const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // const towns = fileContents.towns.map((val) => val["Town"]);
  const questions = fileContents.questions;

  return {
    props: { questions },
  };
};

const index = ({ questions, selectedTownIndex, setSelectedTownIndex }) => {
  //   console.log("qs", questions);
  const [state, setState] = useState(Array(questions.length).fill(0));
  const [counter, setCounter] = useState(0);

  function handleClick(e) {
    let { value } = e.target;
    // console.log(e.target.value);
    let stateCopy = state.slice();
    stateCopy[counter] = parseInt(value);
    setState(stateCopy);
    setCounter((prevState) => prevState + 1);
  }

  useEffect(() => {
    console.log(state);
  }, [state]);

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
          <header>
            <h1 className={styles.h1}>ONE TOWN, TWO VISIONS</h1>
            <h2 className={styles.h2}>
              OUR RESEARCH FOUND THAT THERE WERE TWO GROUPS OF PEOPLE WITH
              DIFFERENT VISIONS OF OUR FUTURE TOWNS, WHICH ARE YOU?
              VOTE ON THE STATEMENTS BELOW TO FIND OUT.
            </h2>
          </header>
          {counter !== 10 && (
            <>
              <div
                style={{
                  minHeight: "8rem",
                  marginTop: "2rem",
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  alignItems: "center",
                  width: "80%",
                  margin: "auto",
                  borderRadius: "5px",
                  border: "1px solid #1d3336",
                  boxShadow: "3px 3px 10px",
                }}
              >
                {questions.map((q, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "whitesmoke",
                      // borderRadius: "5px",
                      width: "90%",
                      margin: "auto",
                      textAlign: "center",
                      verticalAlign: "middle",
                      overflow: "hidden",
                      padding: "0.5rem",
                      // minHeight: "35vh",
                      display: counter === i ? "block" : "none",
                    }}
                  >
                    <Fade right>
                      <p style={{ fontWeight: "900" }}>{q}</p>
                    </Fade>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "5rem",
                }}
              >
                <p
                  style={{
                    margin: "1rem 0",
                    fontWeight: "900",
                    WebkitTextStroke: "0.5px",
                  }}
                >
                  DO YOU AGREE?{" "}
                </p>
                <div>
                  <button
                    className={styles.btn}
                    onClick={handleClick}
                    style={{ marginLeft: "2ch" }}
                    value={5}
                  >
                    YES
                  </button>
                  <button
                    className={styles.btn}
                    value={-5}
                    onClick={handleClick}
                    style={{ margin: "0 1.5ch" }}
                  >
                    NO
                  </button>
                  <button
                    className={styles.btn}
                    value={0}
                    onClick={handleClick}
                  >
                    PASS/UNSURE
                  </button>
                </div>
              </div>
            </>
          )}
          {counter == 10 && (
            <Zoom>
              <div
                style={{
                  minHeight: "13rem",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  backgroundColor: "#ee7155",
                  color: "whitesmoke",
                  padding: "1rem",
                  border: "1px solid #1d3336",
                  borderRadius: "15px",
                  boxShadow: "1px 1px 6px #1d3336",
                }}
              >
                <p style={{ fontWeight: "bold", WebkitTextStroke: "0.5px" }}>
                  YOU ARE
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    margin: "0.5rem 0 1rem 0",
                    backgroundColor: "whitesmoke",
                    WebkitTextStroke: "0.5px",
                    padding: "0.1rem 0.5rem",
                    borderRadius: "3px",
                    textAlign: 'center'
                  }}
                >
                  TOWN TRADITIONALIST
                </p>
                <p style={{ fontWeight: "bold" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </Zoom>
          )}
          <Gauge score={state.reduce((a, c) => a + c, 50)} />
        </main>
      </div>
    </div>
  );
};

export default index;
