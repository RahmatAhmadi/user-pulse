import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NameProvider } from "./store/context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <NameProvider>
      <App />
    </NameProvider>
  </React.StrictMode>
);
