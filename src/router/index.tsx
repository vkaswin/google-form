import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Fragment, lazy, Suspense, useEffect } from "react";
import { LayoutProps, nestedRoute } from "types/Router";
import { router } from "./router";
import { AuthProvider } from "hooks/useAuth";

const Layout = ({ component, redirect = "", path }: LayoutProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (redirect.length > 0 && pathname === path) return navigate(redirect);
  }, [pathname]);

  return component;
};

const nestedRoutes: nestedRoute = ({
  path,
  auth = false,
  children = [],
  componentPath = "",
  redirect = "",
}) => {
  if (redirect.length > 0 && componentPath.length === 0)
    return <Route path={path} element={<Navigate to={redirect} replace />} />;

  const PageComponent = lazy(
    () => import(/* webpackChunkName: "[request]" */ `../${componentPath}`)
  );

  if (children.length > 0) {
    return (
      <Route
        path={path}
        element={
          <Layout
            component={<PageComponent />}
            redirect={redirect}
            path={path}
          />
        }
      >
        {children.map((route) => {
          if (route.children && route.children.length > 0) {
            return <Fragment key={route.path}>{nestedRoutes(route)}</Fragment>;
          }

          const ChildComponent = lazy(
            () =>
              import(
                /* webpackChunkName: "[request]" */ `../${route.componentPath}`
              )
          );

          return (
            <Route
              path={route.path}
              key={route.path}
              element={<ChildComponent />}
            />
          );
        })}
      </Route>
    );
  }

  return <Route path={path} key={path} element={<PageComponent />} />;
};

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HashRouter>
        <AuthProvider>
          <Routes>
            {router.map((route) => {
              return (
                <Fragment key={route.path}>{nestedRoutes(route)}</Fragment>
              );
            })}
          </Routes>
        </AuthProvider>
      </HashRouter>
    </Suspense>
  );
};

export default App;
