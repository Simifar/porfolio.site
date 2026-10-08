import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// A note for whoever opens DevTools: often the same people who review code.
console.info(
  "%cEgor Matafonov · Product Manager%c\nLooking for a remote PM role: Matafonovegor2@gmail.com\nThis site's source: https://github.com/Simifar/porfolio.site\nTip: press Ctrl/⌘ + K to jump anywhere.",
  "font: 600 14px/1.6 'IBM Plex Sans', sans-serif; color: #F27A65",
  "font: 12px/1.6 'IBM Plex Mono', monospace",
);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
