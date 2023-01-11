import { createHashRouter, Navigate } from "react-router-dom";
import FormLayout from "layouts/FormLayout";
import Edit from "pages/Form/Edit";
import PageNotFound from "pages/404";
import Fill from "pages/Form/Fill";
import Preview from "pages/Form/Preview";
import Demo from "pages/Form/Demo";

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/form/123/edit" replace />,
    // element: <Navigate to="/demo" replace />,
  },
  {
    path: "/form/:formId",
    element: <FormLayout />,
    children: [
      { path: "edit", element: <Edit /> },
      { path: "preview", element: <Preview /> },
      { path: "fill", element: <Fill /> },
    ],
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
