import fs from "fs";
import path from "path";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import HomeSVG from "../components/HomeSVG";
import Nav from "../components/Nav";
import Link from "next/link";

export const getStaticProps = async () => {
  const dbDirectory = path.join(process.cwd(), "./db");
  const filePath = path.join(dbDirectory, "towns.json");
  const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const towns = fileContents.towns.map((val) => val["Town"].toUpperCase());
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
    <div>
      <Head>
        <title>Future Towns</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/Avenir.ttc" as="font" crossOrigin="" />
      </Head>
      <main className={styles.main}>
        <Nav />
        <div>
          <h1
            style={{
              margin: "1rem 2rem 0.25rem 2rem",
              textAlign: "center",
              WebkitTextStroke: "2px",
              color: "white",
              textShadow: "3px 3px 4px black",
              fontSize: "3rem",
            }}
          >
            HOME PAGE HEADING
            {/* <hr
            style={{
              backgroundColor: "#ee7155",
              height: "0.2rem",
              border: "none",
              background: "linear-gradient(#1D3336 2%,#EE7155 100%)",
              borderRadius: "10px",
              width: "60%",
              margin: "auto",
            }}
          /> */}
          </h1>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "900",
              textAlign: "center",
              WebkitTextStroke: "1px",
              textShadow: "1px 1px 3px white",
              margin: "0 1rem",
            }}
          >
            SUBHEADING... LOREM IPSUM DOLOR SIT AMET
          </p>
        </div>
        <div className={styles.container}>
          <div
            style={{
              width: "100%",
              color: "white",
              padding: "1rem 3rem 5rem 3rem",
              background: "linear-gradient(rgba(238, 113, 85, 0.5), #1d3336)",
            }}
          >
            <p
              style={{
                fontSize: "1.15rem",
                textAlign: "center",
                // WebkitTextStroke: "0.5px",
                fontWeight: "900",
                color: "white",
                margin: "0.5rem auto",
                textShadow: "1px 1px 2px #1d3336",
                width: "max-content",
              }}
            >
              SUB SECTION HEADING
              {/* <hr style={{ width: "75%", margin: "auto " }} /> */}
            </p>
            <p
              style={{
                color: "white",
                // fontWeight: "600",
                textAlign: "center ",
                maxWidth: "798px ",
                margin: "auto ",
              }}
            >
              Brief introduction to the online tool and research... Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          {/* <div
            style={{
              minHeight: "20vh",
              width: '100%',
              background: "linear-gradient(transparent, #1d3336)",
            }}
          ></div> */}
          <div
            style={{
              backgroundColor: "rgba(29, 51, 54, 1)",
              borderTop: "1px solid #1d3336",
              borderBottom: "1px solid #1d3336",
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              padding: "1rem 0 4rem 0",
            }}
          >
            <div
              style={{
                maxWidth: "max-content",
                margin: '1rem 0'
              }}
            >
              <div
                style={{
                  display: "flex",
                  margin: "0 1rem",
                  // flexWrap: "wrap",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    marginRight: "1.7rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#ee7155",
                    fontSize: "1.2rem",
                  }}
                >
                  SEARCH FOR YOUR TOWN
                </span>
                <div style={{ display: "flex", maxWidth: "100%" }}>
                  <input
                    list="townlist"
                    name="townlist"
                    onChange={handleChange}
                    style={{
                      borderRadius: "5px 0 0 5px",
                      paddingLeft: "10px",
                      fontSize: "1.25rem",
                      border: "1px solid black",
                    }}
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
                    <svg
                      width="34"
                      height="29"
                      viewBox="0 0 34 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.5 24.75C17.6062 24.7494 20.6229 23.8334 23.0698 22.1476L30.7627 28.9248L33.2373 26.7449L25.5443 19.9677C27.4588 17.812 28.4993 15.1538 28.5 12.4166C28.5 5.61635 22.2192 0.083313 14.5 0.083313C6.78075 0.083313 0.5 5.61635 0.5 12.4166C0.5 19.2169 6.78075 24.75 14.5 24.75ZM14.5 3.16665C20.2908 3.16665 25 7.31527 25 12.4166C25 17.518 20.2908 21.6666 14.5 21.6666C8.70925 21.6666 4 17.518 4 12.4166C4 7.31527 8.70925 3.16665 14.5 3.16665Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div
                style={{
                  visibility: error ? "visible" : "hidden",
                  textAlign: "right",
                  color: "#ee7155",
                  // marginBottom: "1rem",
                  marginRight: "2.8rem",
                }}
              >
                Please try again!
              </div>
            </div>
            <button
              style={{
                fontWeight: "900",
                backgroundColor: "#ee7155",
                color: "#1d3336",
                borderRadius: "5px",
                padding: "0.3rem 1rem",
                margin: "auto 0",
                WebkitTextStroke: "0.5px",
                fontSize: "1.2rem",
              }}
            >
              <Link href="/one-town-two-visions">
                <a>TAKE THE POLL</a>
              </Link>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
