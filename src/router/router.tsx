import { createHashRouter, Navigate } from "react-router-dom";
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
  { path: "/form/:id/edit", element: <Edit /> },
  { path: "/form/:id/preview", element: <Preview /> },
  { path: "/form/:id/fill", element: <Fill /> },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
