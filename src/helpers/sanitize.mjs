export function sanitizeUrl(str) {
  return str
    .normalize('NFD') // decompose combined graphemes into base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove diacritical marks
    .toLowerCase() // convert to lowercase
    .replace('ä', 'ae')
    .replace('ö', 'oe')
    .replace('ü', 'ue')
    .replace('ß', 'ss')
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)+/g, ""); // remove leading/trailing hyphens
}

export function sanitizeImageString(str) {
  return str.replace(/[^a-zA-Z]/g, "").toLowerCase();
}
