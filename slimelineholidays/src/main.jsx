import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";

import "./assets/css/style.css";

import { HomeProvider } from "./contexts/NavigationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <HomeProvider>
        <RouterProvider router={router} />
      </HomeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
