export type CookieSetter<T> = {
  name: string;
  value: T;
  days: number;
};

export type Cookies = () => {
  set: <T>({ days, name, value }: CookieSetter<T>) => void;
  get: (name: string) => string | null;
  remove: (name: string) => void;
};
