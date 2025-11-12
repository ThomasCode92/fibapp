import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import FibCalculatedValues from "~/components/FibCalculatedValues";
import FibIndices from "~/components/FibIndices";
import SubmitIndexForm from "~/components/SubmitIndexForm";

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
        <FibIndices />
        <FibCalculatedValues />
        <SubmitIndexForm />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
