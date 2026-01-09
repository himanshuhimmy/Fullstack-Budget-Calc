import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextStore from "./Store/ContextStore.jsx";
import { BrowserRouter, createBrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ContextStore>
        <App />
      </ContextStore>
    </BrowserRouter>
  </StrictMode>
);
