import { customAlphabet } from "nanoid";

const getId = (prefix, size) => {
  return `${prefix}${customAlphabet("1234567890abcdef", size)}`.toUpperCase();
};

export default getId;
