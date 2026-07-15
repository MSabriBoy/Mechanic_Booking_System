import sanitizeHtml from "sanitize-html";

const sanitizeText = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
};

export default sanitizeText;