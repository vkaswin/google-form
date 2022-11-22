import ReactDOM from "react-dom/client";
import Router from "./router";

import "assets/scss/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Router />);
