import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Router } from "./types";
import { Fragment, lazy, Suspense } from "react";

const router: Router[] = [
  {
    path: "auth",
    componentPath: "layouts/AuthLayout",
    auth: false,
    children: [
      {
        path: "login",
        componentPath: "pages/Login",
        auth: false,
      },
      {
        path: "register",
        componentPath: "pages/Register",
        auth: false,
      },
      {
        path: "password",
        componentPath: "pages/Password",
        auth: false,
        children: [
          {
            path: "change",
            componentPath: "pages/Password/Change",
            auth: false,
          },
          {
            path: "recover",
            componentPath: "pages/Password/Recover",
            auth: false,
            children: [
              {
                path: "forget",
                componentPath: "pages/Password/Recover/Forget",
                auth: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

const nestedRoutes = ({
  path,
  auth = false,
  children = [],
  componentPath,
}: Router): any => {
  const PageComponent = lazy(() => import(`../${componentPath}`));

  if (children.length > 0) {
    return (
      <Route path={path} element={<PageComponent />}>
        {children.map((route) => {
          if (route.children && route.children.length > 0) {
            return <Fragment key={route.path}>{nestedRoutes(route)}</Fragment>;
          }

          const Component = lazy(() => import(`../${route.componentPath}`));

          return (
            <Route path={route.path} key={route.path} element={<Component />} />
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
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          {router.map((route) => {
            return <Fragment key={route.path}>{nestedRoutes(route)}</Fragment>;
          })}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

export default App;
