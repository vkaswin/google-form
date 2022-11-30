import { createHashRouter, Navigate } from "react-router-dom";
import AuthLayout from "layouts/AuthLayout";
import FormLayout from "layouts/FormLayout";
import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import EditForm from "pages/Form/Edit";
import ViewForm from "pages/Form/View";
import PageNotFound from "pages/404";

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
      { path: ":id/edit", element: <EditForm /> },
      { path: ":id/fill", element: <ViewForm /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
