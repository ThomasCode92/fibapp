import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import FibCalculator from "~/components/FibCalculator";

import "./App.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container">
        <hgroup>
          <h1>FibApp – A Fibonacci Calculator</h1>
          <p>Find out the value of your favorite Fibonacci number!</p>
        </hgroup>
        <FibCalculator />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
