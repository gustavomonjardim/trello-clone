import * as React from "react";
import { render } from "react-dom";
import { BoardProvider } from "./context/BoardContext";
import App from "./App";

const rootElement = document.getElementById("root");
render(
  <BoardProvider>
    <App />
  </BoardProvider>,
  rootElement
);
