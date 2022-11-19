import ReactDOM from "react-dom/client";
import Router from "./router";

import "assets/scss/common.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<Router />);
