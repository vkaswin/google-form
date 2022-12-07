import { createHashRouter, Navigate } from "react-router-dom";
import AuthLayout from "layouts/AuthLayout";
import FormLayout from "layouts/FormLayout";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Edit from "pages/Form/Edit";
import PageNotFound from "pages/404";
import Fill from "pages/Form/Fill";
import Preview from "pages/Form/Preview";

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/form/123/edit" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/form",
    element: <FormLayout />,
    children: [
      { path: ":id/edit", element: <Edit /> },
      { path: ":id/preview", element: <Preview /> },
      { path: ":id/fill", element: <Fill /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
