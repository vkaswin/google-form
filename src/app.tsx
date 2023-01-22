import { Fragment } from "react";
import { AuthProvider } from "hooks/useAuth";
import Router from "./router";
import { ToastContainer } from "react-toastify";

import "assets/scss/index.scss";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Fragment>
      <AuthProvider>
        <Router />
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnHover
        closeButton
      />
    </Fragment>
  );
};

export default App;
