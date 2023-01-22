import { Navigate, useRoutes } from "react-router-dom";
import EditForm from "pages/EditForm";
import PreviewForm from "pages/PreviewForm";
import FillForm from "pages/FillForm";
import AuthLayout from "layouts/AuthLayout";
import Login from "pages/Login";
import Register from "pages/Register";
import FormList from "pages/FormList";
import PageNotFound from "pages/404";
import { cookie } from "utils";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Navigate
          to={`${cookie.get("auth_token") ? "/form/list" : "/auth/login"}`}
          replace
        />
      ),
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
      element: <ProtectedRoute children={<FormList />} />,
    },
    {
      path: "/form/:formId/edit",
      element: <ProtectedRoute children={<EditForm />} />,
    },
    { path: "/form/:formId/preview", element: <PreviewForm /> },
    {
      path: "/form/:formId/fill",
      element: <ProtectedRoute children={<FillForm />} />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return routes;
};

export default Routes;
