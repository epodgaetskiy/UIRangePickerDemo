import React from "react";
import ReactDOM from "react-dom";
import { UIRangePicker } from "./range_picker";

function App() {
  return <UIRangePicker />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
