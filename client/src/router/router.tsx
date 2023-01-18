import { createHashRouter, Navigate } from "react-router-dom";
import EditForm from "pages/EditForm";
import PreviewForm from "pages/PreviewForm";
import FillForm from "pages/FillForm";
import AuthLayout from "layouts/AuthLayout";
import Login from "pages/Login";
import Register from "pages/Register";
import FormList from "pages/FormList";
import PageNotFound from "pages/404";

const Router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/form/63c6cd6579ae4c52238e98a1/edit" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/form/list",
    element: <FormList />,
  },
  {
    path: "/form/:formId/edit",
    element: <EditForm />,
  },
  { path: "/form/:formId/preview", element: <PreviewForm /> },
  { path: "/form/:formId/fill", element: <FillForm /> },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default Router;
