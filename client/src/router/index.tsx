import { RouterProvider } from "react-router-dom";
import router from "./Router";

const Router = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Loading...</div>}
    ></RouterProvider>
  );
};

export default Router;
