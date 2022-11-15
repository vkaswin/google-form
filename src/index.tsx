import { Fragment } from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = () => {
  return (
    <Fragment>
      <Router />
    </Fragment>
  );
};

root.render(<App />);
