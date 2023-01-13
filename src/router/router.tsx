import { createHashRouter, Navigate } from "react-router-dom";
import Edit from "pages/Form/Edit";
import PageNotFound from "pages/404";
import Fill from "pages/Form/Fill";

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/form/123/edit" replace />,
    // element: <Navigate to="/demo" replace />,
  },
  { path: "/form/:formId/edit", element: <Edit /> },
  { path: "/form/:formId/preview", element: <Fill isPreview /> },
  { path: "/form/:formId/fill", element: <Fill /> },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
