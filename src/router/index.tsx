import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "hooks/useAuth";
import { router } from "./router";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={<div>Loading...</div>}
      ></RouterProvider>
    </AuthProvider>
  );
};

export default App;
