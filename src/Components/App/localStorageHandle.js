const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getFromLocalStorage = (key) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};
const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
};
export { setToLocalStorage, getFromLocalStorage, removeFromLocalStorage };
