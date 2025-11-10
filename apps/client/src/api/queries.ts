export function fetchAllValues() {
  return fetch("/api/values").then(res => res.json());
}
