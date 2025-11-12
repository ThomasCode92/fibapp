export function fetchAllValues() {
  return fetch("/api/values").then(res => res.json());
}

export function fetchAllCalculatedValues() {
  return fetch("/api/values/calculated").then(res => res.json());
}
