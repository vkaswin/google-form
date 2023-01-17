import { createHashRouter, Navigate } from "react-router-dom";
import EditForm from "pages/EditForm";
import PreviewForm from "pages/PreviewForm";
import FillForm from "pages/FillForm";
import PageNotFound from "pages/404";

export const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to="/form/63c6cd6579ae4c52238e98a1/edit" replace />,
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