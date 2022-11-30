export const cookies = () => {
  const set = <T,>({
    name,
    value,
    days,
  }: {
    name: string;
    value: T;
    days: number;
  }): void => {
    let expireDate = new Date();
    expireDate.setTime(expireDate.getTime() + days * 24 * 60 * 60 * 1000);
    let expires = "; expires=" + expireDate.toUTCString();
    document.cookie = name + "=" + JSON.stringify(value) + expires + "; path=/";
  };

  const get = (name: string): string | null => {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  };

  const remove = (name: string): void => {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };

  return {
    set,
    get,
    remove,
  };
};

export const clickOutside = ({
  ref,
  onClose,
  doNotClose = () => false,
}: {
  ref: HTMLElement;
  onClose: () => void;
  doNotClose?: (element: HTMLElement) => boolean;
}) => {
  if (!ref) return;

  const handleClickOutside = (event: MouseEvent) => {
    let { target } = event;
    if (
      ref.contains(target as HTMLElement) ||
      doNotClose(target as HTMLElement)
    )
      return;
    onClose();
    document.removeEventListener("click", handleClickOutside);
  };

  document.addEventListener("click", handleClickOutside);
};

export const shuffleArray = <T,>(array: T[]): T[] | undefined => {
  if (!Array.isArray(array)) return;
  let arr = [...array];
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};
