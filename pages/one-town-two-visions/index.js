import fs from "fs";
import path from "path";
import Head from "next/head";
import Nav from "../../components/Nav";
import styles from "../../styles/One-Town-Two-Visions.module.css";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Fade";
import { useState } from "react";
import Gauge from "../../components/Gauge";
import Demographics from "../../components/Demographics";
import Footer from "../../components/Footer";

export const getStaticProps = async () => {
  const dbDirectory = path.join(process.cwd(), "./db");
  const filePath = path.join(dbDirectory, "polis.json");
  const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const answerValues = fileContents.data.map((obj) => ({
    yes: obj["Adjusted yes"],
    no: obj["Adjusted no"],
  }));
  const questions = fileContents.data.map((obj) => obj.Text.toUpperCase());

  return {
    props: { questions, answerValues },
  };
};

const index = ({
  questions,
  answerValues,
  selectedTownIndex,
  setSelectedTownIndex,
  isConnected,
}) => {
  const [state, setState] = useState(Array(questions.length).fill(0));
  const [counter, setCounter] = useState(0);

  function handleClick(e) {
    let { value } = e.target;
    let stateCopy = state.slice();
    stateCopy[counter] = parseInt(value);
    setState(stateCopy);
    setCounter((prevState) => prevState + 1);
  }

  const groupA = {
    title: "EARLY ADOPTER",
    text:
      "Early adopters are characterised by their support for greater diversity in their town. They are worried about ageing in towns and strongly support the creation of new jobs and homes. They prioritise access to amenities and services over a sense of community. They are more likely to be younger, Remain-supporting and are evenly split between voting Conservative and Labour.",
  };

  const groupB = {
    title: "PRESERVER",
    text:
      "Preservers are characterised by their opposition to greater diversity in their town and are worried about their town losing its identity. They are less concerned about ageing population in towns and are less supportive of new jobs and homes in their town. They prioritise a sense of community over access to amenities and services. They are more likely to be older, Leave and Conservative supporting and in the south of England.",
  };

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
              DIFFERENT VISIONS OF OUR FUTURE TOWNS, WHICH ARE YOU? VOTE ON THE
              STATEMENTS BELOW TO FIND OUT.
            </h2>
          </header>
          {counter !== 12 && (
            <>
              <div
                style={{
                  minHeight: "8rem",
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  alignItems: "center",
                  width: "80%",
                  margin: "1rem auto",
                  borderRadius: "5px",
                  border: "1px solid #1d3336",
                  boxShadow: "3px 3px 10px",
                }}
                className={styles.question_card}
              >
                {questions.map((q, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "whitesmoke",
                      width: "90%",
                      margin: "auto",
                      textAlign: "center",
                      verticalAlign: "middle",
                      overflow: "hidden",
                      padding: "0.5rem",
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
                  flexDirection: "column",
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
                <div style={{ display: "flex" }}>
                  <button
                    className={styles.btn}
                    onClick={handleClick}
                    style={{
                      margin: "0 1ch",
                      backgroundColor: "#1d3336",
                    }}
                    value={answerValues[counter].yes}
                  >
                    YES
                  </button>
                  <button
                    className={styles.btn}
                    value={answerValues[counter].no}
                    onClick={handleClick}
                    style={{
                      margin: "0 1ch",
                      backgroundColor: "#1d3336",
                    }}
                  >
                    NO
                  </button>
                  <button
                    className={styles.btn}
                    value={0}
                    onClick={handleClick}
                    style={{
                      backgroundColor: "#1d3336",
                      margin: "0 1ch",
                    }}
                  >
                    PASS/UNSURE
                  </button>
                </div>
              </div>
            </>
          )}
          {counter == 12 && (
            <Zoom>
              <div className={styles.poll_result}>
                <p style={{ fontWeight: "bold", WebkitTextStroke: "0.5px" }}>
                  YOU ARE A{state.reduce((a, c) => a + c, 50) > 50 ? 'N': ''}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    margin: "0.5rem 0 1rem 0",
                    backgroundColor: "rgb(238, 113, 85)",
                    WebkitTextStroke: "0.5px",
                    padding: "0.1rem 0.5rem",
                    borderRadius: "3px",
                    textAlign: "center",
                  }}
                >
                  {state.reduce((a, c) => a + c, 50) > 50
                    ? groupA.title
                    : groupB.title}
                </p>
                <p style={{ fontWeight: "bold" }}>
                  {state.reduce((a, c) => a + c, 50) > 50
                    ? groupA.text
                    : groupB.text}
                </p>
              <br />
              <br />
              <p style={{ fontWeight: "bold" }}>See the pie chart below to take a closer look at the two town groups.</p>
              </div>
            </Zoom>
          )}
          <Gauge score={state.reduce((a, c) => a + c, 50)} />
          {counter == 12 && (
            <Demographics group={state.reduce((a, c) => a + c, 50) > 50 ? 'A': 'B'} />
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default index;
