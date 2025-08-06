import express, { type Express } from "express";

import { redis } from "~/clients/redis";

export const app: Express = express();

app.get("/", async (_req, res) => {
  const count = await redis.incr("count");
  res.json({ message: `Hello from the API! You are visitor number ${count}.` });
});
