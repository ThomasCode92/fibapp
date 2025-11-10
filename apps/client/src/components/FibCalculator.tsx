import { useFibValues } from "~/hooks/use-fib-values";

export default function FibCalculator() {
  const { data: response } = useFibValues();

  if (!response) return null; // TODO: Handle loading state

  return (
    <section>
      <h2>Indices I have seen:</h2>
      <ul>
        {response.data.length === 0 && <li>No indices found, yet.</li>}
        {response.data.map((index: number) => (
          <li key={index}>{index}</li>
        ))}
      </ul>
    </section>
  );
}
