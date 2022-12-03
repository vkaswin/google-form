import {
  createHashRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import EditForm from "pages/EditForm";
import ViewForm from "pages/ViewForm";
import PageNotFound from "pages/404";
import { Fragment } from "react";
import { FormProvider } from "hooks/useForm";

export const router = createHashRouter(
  createRoutesFromElements(
    <Fragment>
      <Route path="/" element={<Navigate to="/form/123/edit" replace />} />
      <Route path="/form" element={<FormProvider />}>
        <Route path=":formId/edit" element={<EditForm />} />
        <Route path=":formId/view" element={<ViewForm />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Fragment>
  )
);
