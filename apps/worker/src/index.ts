import { createClient } from "@redis/client";

import * as env from "~/config/env";
import { fib } from "~/utils/fib";

// Redis client setup
const client = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

client.on("error", err => console.error("Redis Client Error", err));
client.connect().then(() => console.log("Redis connected successfully!"));

const sub = client.duplicate();
sub.on("error", err => console.error("Redis Subscriber Error", err));
await sub.connect();

const listener = async (message: string, channel: string) => {
  console.log(`Received message "${message}" from channel "${channel}"`);
  const fibNum = fib(Number(message));
  await client.set(`fib:${message}`, fibNum);
  const result = await client.get(`fib:${message}`);
  console.log(`Fibonacci of ${message} is ${result}`);
};

await sub.subscribe("message", listener);
