import "../styles/globals.css";
// import AppProvider from "../store/AppProvider";
import { useState } from "react";
// import "react-gauge-chart/dist/GaugeChart/style.css";

function MyApp({ Component, pageProps }) {
  const [selectedTownIndex, setSelectedTownIndex] = useState(null);

  return (
    // <AppProvider value={{ selectedTown }}>
    <Component
      {...pageProps}
      selectedTownIndex={selectedTownIndex}
      setSelectedTownIndex={setSelectedTownIndex}
    />
    // </AppProvider>
  );
}

export default MyApp;
