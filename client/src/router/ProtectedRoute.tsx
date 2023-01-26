import useAuth from "hooks/useAuth";
import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (!user) {
      return (
        <Navigate
          replace
          to={`/auth/login${
            pathname ? `?url=${window.encodeURIComponent(pathname)}` : ""
          }`}
        />
      );
    } else {
      return children;
    }
  }
};

export default ProtectedRoute;
