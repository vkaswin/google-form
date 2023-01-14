import { createHashRouter, Navigate } from "react-router-dom";
import FormBuilder from "components/FormBuilder";
import PageNotFound from "pages/404";

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/form/123/edit" replace />,
  },
  {
    path: "/form/:formId/edit",
    element: <FormBuilder isEdit />,
  },
  { path: "/form/:formId/preview", element: <FormBuilder isPreview /> },
  { path: "/form/:formId/fill", element: <FormBuilder isFill /> },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
