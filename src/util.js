import axios from "axios";

export const responseToBase64 = response => {
  const binary = new Buffer(response.data, "binary").toString("base64");
  return `data:${response.headers["content-type"]};base64,${binary}`;
};
export const loadSingleImage = endpoint => () =>
  axios.get(endpoint, { responseType: "arraybuffer" });

export const isVisible = (element, offsetFun) => {
  if (!element) return false;

  const { top, height } = element.getBoundingClientRect();
  const offset = (offsetFun && offsetFun(height)) || height / 2;
  return top + offset >= 0 && top - offset <= window.innerHeight;
};

export const idle = () => {};
