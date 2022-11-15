import { HashRouter, Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<div>Hello World</div>} path="/"></Route>
      </Routes>
    </HashRouter>
  );
};

export default Router;
