export const debounce = (
  func,
  delay = parseInt(process.env.NEXT_PUBLIC_DEBOUNCE_DELAY || "300")
) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
