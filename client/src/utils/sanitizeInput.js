import DOMPurify from "dompurify";

const sanitizeInput = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
};

export default sanitizeInput;