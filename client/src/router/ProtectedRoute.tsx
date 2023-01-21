import { ReactElement } from "react";
import { Navigate } from "react-router";
import { cookie } from "utils";

type ProtectedRouteProps = {
  children: ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = cookie.get("auth_token");
  const url = window.encodeURIComponent(window.location.hash.substring(1));

  if (!token)
    return (
      <Navigate replace to={`/auth/login${url.length ? `?url=${url}` : ""}`} />
    );
  else return children;
};

export default ProtectedRoute;
