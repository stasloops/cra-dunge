import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={"692754586986-3sbb1m2i0u9qf42b8kju0qvnsi65a43l.apps.googleusercontent.com"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
