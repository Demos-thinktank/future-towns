// import React, { useState, createContext } from "react";
// import data from "../db/towns";

// export const AppContext = createContext();

// // export const getStaticProps = async () => {
// const towns = data.map((val) => val["Town"]);
// //   return {
// //     props: { towns, data },
// //   };
// // };

// const AppProvider = ({ props }) => {
//   console.log(props);
//   const [selectedTown, setSelectedTown] = useState(null);
//   const AppState = { towns, data, selectedTown, setSelectedTown };

//   return (
//     <AppContext.Provider value={AppState}>{props.children}</AppContext.Provider>
//   );
// };

// export default AppProvider;

import React from "react";
const AppContext = React.createContext();
export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
export default AppContext;
