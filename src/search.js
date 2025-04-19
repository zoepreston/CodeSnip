export function simpleMatch(query, text) {
  if (!query) return true;
  return text.toLowerCase().includes(query.toLowerCase());
}

