// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (element: any) : boolean => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom
      <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
