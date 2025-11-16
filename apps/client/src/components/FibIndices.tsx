import { useFibValues } from "~/hooks/use-fib-values";

export default function FibIndices() {
  const { data: valuesResponse } = useFibValues();

  if (!valuesResponse) return null; // TODO: Handle loading state

  return (
    <section>
      <h2>Indices I have seen:</h2>
      <ul>
        {valuesResponse.data.length === 0 && <li>No indices found, yet.</li>}
        {valuesResponse.data.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>
    </section>
  );
}
