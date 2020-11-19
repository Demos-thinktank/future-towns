import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1d3336",
        borderTop: "1px solid black",
        // position: "fixed",
        // bottom: 0,
        // width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <a href="https://demos.co.uk/" target="blank">
          <img
            src="/images/demos-light.jpg"
            style={{
              backgroundColor: "#1d3336",
              height: "1.5rem",
              // margin: "0.5rem",
            }}
          />
        </a>
        <a href="https://home.kpmg/" target="blank">
          <img
            src="/images/kpmg-logo.png"
            style={{
              backgroundColor: "#1d3336",
              height: "2rem",
              // margin: "1 0.5rem 0 0.5rem",
            }}
          />
        </a>
      </div>
      <div
        style={{
          margin: "0.5rem auto 1rem auto",
          // width: "max-content",
          color: "white",
          fontSize: "0.9rem",
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a href='https://demos.co.uk/about/contact/' target='blank'>Contact us</a>
        <p style={{color: 'white', margin: '0 0.5rem'}}>|</p>
        <Link href="/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
