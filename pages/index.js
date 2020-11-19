import fs from "fs";
import path from "path";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import HomeSVG from "../components/HomeSVG";
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
    // console.log(e.target.value);
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
        <div className={styles.ft_section}>
          <div className={styles.ft_section_heading}>
            <div style={{ margin: "auto" }}>
              <p>FUTURE</p>
              <p>
                T<span className={styles.ft_section_heading_span}>O</span>WNS
              </p>
            </div>
          </div>
          <div className={styles.ft_section_text}>
            <p style={{ marginBottom: "0.5rem" }}>
              Demos and KPMG have been investigating what people in towns want
              the future of towns in the UK to look like.. Here you can find out
              more about your town and see how it compares to other towns. You
              can also see how your views on the future of towns compares to
              others.
            </p>
            <Link href='/'>
            <a className={styles.section_link}>READ THE REPORT</a>
          </Link></div>
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
            <p style={{ marginBottom: "0.5rem" }}>
              Our research found that there are different types of town in the
              UK
            </p>
            <Link href="/town-search" style={{margin: '1rem'}}>
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
              <p className={styles.txt_color_white}>TOWN TRIBES</p>
            </div>
            <p className={styles.txt_color_white}style={{ marginBottom: "0.5rem" }} >
              Our research found that there are different types of town in the
              UK
            </p>
            <Link href="/one-town-two-visions">
              <a className={`${styles.txt_color_white} ${styles.section_link}`}>
                EXPLORE
              </a>
            </Link>
          </div>
        </div>
        {/* <div  className={styles.bkg_img_section}>
          no-content
        </div> */}
        <Footer />
      </main>
    </div>
  );
}
