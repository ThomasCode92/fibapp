import { useFibCalculatedValues, useFibValues } from "~/hooks/use-fib-values";

export default function FibCalculator() {
  const { data: valuesResponse } = useFibValues();
  const { data: calculatedValuesResponse } = useFibCalculatedValues();

  if (!valuesResponse || !calculatedValuesResponse) return null; // TODO: Handle loading state

  return (
    <section>
      <h2>Indices I have seen:</h2>
      <ul>
        {valuesResponse.data.length === 0 && <li>No indices found, yet.</li>}
        {valuesResponse.data.map(number => (
          <li key={number}>{number}</li>
        ))}
      </ul>
      <h2>Calculated Values:</h2>
      <ul>
        {Object.entries(calculatedValuesResponse.data).length === 0 && (
          <li>No calculated values found, yet.</li>
        )}
        {Object.entries(calculatedValuesResponse.data).map(([key, value]) => (
          <li key={key}>
            For index {key}, the fibonacci value is {value}
          </li>
        ))}
      </ul>
    </section>
  );
}
