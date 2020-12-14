import "../styles/globals.css";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [selectedTownIndex, setSelectedTownIndex] = useState(null);

  return (
    <Component
      {...pageProps}
      selectedTownIndex={selectedTownIndex}
      setSelectedTownIndex={setSelectedTownIndex}
    />
  );
}

export default MyApp;
