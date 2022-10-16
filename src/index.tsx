import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './styles/normalize.css';
import "./styles/index.css";
import App from "./App";

// import reportWebVitals from "./tests/reportWebVitals";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// reportWebVitals();
