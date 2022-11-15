export type Router = {
  path: string;
  auth?: boolean;
  componentPath?: string;
  children?: Router[];
};
