import { createClient } from "@redis/client";

import * as env from "~/config/env";

export const redisClient = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

redisClient.on("error", err => console.error("Redis Client Error", err));
redisClient.on("ready", () => console.log("Connected to Redis successfully!"));
