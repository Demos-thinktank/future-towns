import fs from "fs";
import path from "path";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Nav from "../components/Nav";
import Link from "next/link";
import Footer from "../components/Footer";

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
    setError(false);

    var el = document
      .getElementById("townlist")
      .options.namedItem(e.target.value.toUpperCase());

    if (el) {
      // console.log(el.getAttribute("data-id"));
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

  return (
    <div>
      <Head>
        <title>Future Towns</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/fonts/Avenir.ttc" as="font" crossOrigin="" />
      </Head>
      <main className={styles.main}>
        <Nav />
        <div className={styles.ft_section}>
          <div className={styles.ft_section_heading}>
            <div>
              <p>FUTURE</p>
              <p>
                T<span className={styles.ft_section_heading_span}>O</span>WNS
              </p>
            </div>
          </div>
          <div className={styles.ft_section_text}>
            <p
              style={{
                marginBottom: "0.5rem",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Demos and KPMG have been investigating what the public want the
              future of towns in the UK to look like.
            </p>
            <Link href="/">
              <a className={styles.section_link}>READ THE REPORT</a>
            </Link>
          </div>
        </div>
        <div className={styles.tot_section}>
          <div style={{ maxWidth: "75%" }} className={`${styles.section} `}>
            <div
              className={styles.section_heading}
              style={{ minWidth: "max-content" }}
            >
              <p>TYPES OF</p>
              <p>TOWNS</p>
            </div>
            <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
              Find out more about your town and see how it compares to other
              towns.
            </p>
            <Link href="/town-search" style={{ margin: "1rem" }}>
              <a className={styles.section_link}>EXPLORE</a>
            </Link>
          </div>
        </div>
        <div className={styles.ttt_section}>
          <div style={{ maxWidth: "75%" }} className={`${styles.section} `}>
            <div
              className={styles.section_heading}
              style={{ minWidth: "max-content" }}
            >
              <p className={styles.txt_color_white}>THE TWO</p>
              <p className={styles.txt_color_white}>TOWN GROUPS</p>
            </div>
            <p
              className={styles.txt_color_white}
              style={{
                marginBottom: "0.5rem",
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              See how your views on the future of towns compare to others’.
            </p>
            <Link href="/one-town-two-visions">
              <a className={`${styles.txt_color_white} ${styles.section_link}`}>
                EXPLORE
              </a>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
