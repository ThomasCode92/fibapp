import { createClient } from "@redis/client";

import * as env from "~/config/env";

// Redis client setup
const client = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

client.on("error", err => console.error("Redis Client Error", err));
client.connect().then(() => console.log("Redis connected successfully!"));

const sub = client.duplicate();
sub.on("error", err => console.error("Redis Subscriber Error", err));
await sub.connect();

const listener = (message: string, channel: string) =>
  console.log(message, channel);
await sub.subscribe("message", listener);

// Test Redis connection
await client.set("hello", "world");
const value = await client.get("hello");
console.log("Hello", value);
