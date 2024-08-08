import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

document.addEventListener("gesturestart", function (e) {
  e.preventDefault();
});

document.addEventListener("gesturechange", function (e) {
  e.preventDefault();
});

document.addEventListener("gestureend", function (e) {
  e.preventDefault();
});

document.addEventListener("touchmove", function (e) {
  e.preventDefault();
});

document.addEventListener("touchstart", function (e) {
  e.preventDefault();
});

document.addEventListener("touchend", function (e) {
  e.preventDefault();
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
