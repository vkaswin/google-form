import useAuth from "hooks/useAuth";
import { ReactElement } from "react";
import { Navigate } from "react-router";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  const url = window.encodeURIComponent(window.location.hash.substring(1));

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (!user)
      return (
        <Navigate
          replace
          to={`/auth/login${url.length ? `?url=${url}` : ""}`}
        />
      );
    else {
      return children;
    }
  }
};

export default ProtectedRoute;
