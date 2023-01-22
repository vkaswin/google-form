import useAuth from "hooks/useAuth";
import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("url");

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    if (!user) {
      return (
        <Navigate
          replace
          to={`/auth/login${redirectUrl ? `?url=${redirectUrl}` : ""}`}
        />
      );
    } else {
      return children;
    }
  }
};

export default ProtectedRoute;
