import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";

import "./scss/volt.scss";  // Core styles
import "react-datetime/css/react-datetime.css"; // Vendor styles

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>  {/* Removed basename to fix the issue */}
      <ScrollToTop />
      <HomePage />
    </HashRouter>
  </React.StrictMode>
);
