import { ReactNode, ReactElement } from "react";

export type Router = {
  path: string;
  auth?: boolean;
  redirect?: string;
  componentPath?: string;
  children?: Router[];
};

export type LayoutProps = {
  component: ReactElement;
  redirect?: string;
  path: string;
};

export type nestedRoute = (routes: Router) => ReactNode;
