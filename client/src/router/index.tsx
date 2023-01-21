import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "hooks/useAuth";
import Router from "./Router";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider
        router={Router}
        fallbackElement={<div>Loading...</div>}
      ></RouterProvider>
    </AuthProvider>
  );
};

export default App;
