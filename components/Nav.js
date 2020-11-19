import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import HomeSVG from "./HomeSVG";

const Nav = () => {
  // const router = useRouter();

  // function handleClick() {
  //   router.push("/");
  // }

  return (
    <div
      style={{
        backgroundColor: "#1d3336",
        padding: "0.5rem 1rem 0.2rem 1rem",
        boxShadow: "4px 4px 6px rgba(0,0,0,0.5)",
        cursor: 'pointer'
      }}
    >
      <Link href='/'>
      <HomeSVG color="white" width="2rem"  /></Link>
    </div>
  );
};

export default Nav;
