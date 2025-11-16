export function submitIndex(index: number) {
  return fetch("/api/values", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index: index }),
  }).then(res => res.json());
}
