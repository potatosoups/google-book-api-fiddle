/**
 * Get a representation for books form the google Google books API
 * @param {string} term sanitized url for use in the uri
 * @returns
 */
export async function getBooks(term) {
  var param = parseTerm(term);
  var url = `https://www.googleapis.com/books/v1/volumes?q=${param}&key=AIzaSyDD-r5yWHrATkjXYFmQBDZDrlsNtN3GBlM`; // Free API key okay to commit to git.
  var response = await fetch(url);
  var json = await response.json();
  return json?.items;
}

/**
 *
 * @param {string} term the query term to
 * parse and prepare for the google book API
 * @returns sanitized string
 */
export function parseTerm(term) {
  return (term || "").split(" ").join("+");
}

/**
 *
 * @param {string} selector CSS Selector to query from the DOM
 * @returns {Element} The queried Element specified by
 * the selector or `undefined` if none found
 */
export function $(selector) {
  return document.querySelector(selector);
}
export function invalidSubmit(e) {
  const isKey = e.type === "keyup" && e.key === "Enter";
  const isClick = e && e.type !== "keyup";
  return isKey === isClick;
}
export function validSubmit(e) {
  return !invalidSubmit(e);
}
