// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { StrictMode } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { App } from './App';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );


// // src/main.jsx
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { SoftProvider } from '../Context/SoftContext';
// import { App } from './App';
// import { BrowserRouter } from 'react-router-dom';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//       <SoftProvider>
//       <BrowserRouter>
//           <App />
//       </BrowserRouter>
//       </SoftProvider>
//   </React.StrictMode>
// );


// main.jsx or index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { SoftProvider } from "../Context/SoftContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SoftProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SoftProvider>
  </React.StrictMode>
);
