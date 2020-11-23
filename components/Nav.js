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
        cursor: "pointer",
      }}
    >
      <Link href="/">
        <svg
          width="2rem"
          height="100%"
          viewBox="0 0 200 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          // onClick={onClick}
        >
          <path
            d="M171.454 92.159V152.019C171.454 154.18 170.669 156.051 169.097 157.631C167.526 159.21 165.665 160 163.515 160H115.879V112.112H84.1213V160H36.4852C34.3349 160 32.4742 159.21 30.9028 157.631C29.3315 156.051 28.5458 154.18 28.5458 152.019V92.159C28.5458 92.0759 28.5665 91.9512 28.6079 91.7849C28.6492 91.6186 28.6699 91.4939 28.6699 91.4108L100 32.2993L171.33 91.4108C171.413 91.577 171.454 91.8264 171.454 92.159ZM199.118 83.5542L191.427 92.7825C190.765 93.5308 189.897 93.988 188.822 94.1543H188.449C187.374 94.1543 186.506 93.8633 185.844 93.2814L100 21.325L14.1558 93.2814C13.1633 93.9465 12.1709 94.2375 11.1785 94.1543C10.1034 93.988 9.23501 93.5308 8.5734 92.7825L0.88215 83.5542C0.220538 82.7228 -0.068918 81.7459 0.0137836 80.6235C0.0964852 79.5012 0.551344 78.6074 1.37836 77.9423L90.572 3.2424C93.2185 1.0808 96.3611 0 100 0C103.639 0 106.782 1.0808 109.428 3.2424L139.697 28.6828V4.36477C139.697 3.20083 140.069 2.24474 140.813 1.49649C141.558 0.748246 142.509 0.374123 143.666 0.374123H167.484C168.642 0.374123 169.593 0.748246 170.338 1.49649C171.082 2.24474 171.454 3.20083 171.454 4.36477V55.2455L198.622 77.9423C199.449 78.6074 199.904 79.5012 199.986 80.6235C200.069 81.7459 199.779 82.7228 199.118 83.5542Z"
            fill="whitesmoke"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Nav;
