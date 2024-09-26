import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CommentsProvider } from "./Components/commentsContext";
import commentsData from "./commentsData.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CommentsProvider commentsData={commentsData}>
    <App />
  </CommentsProvider>
);
