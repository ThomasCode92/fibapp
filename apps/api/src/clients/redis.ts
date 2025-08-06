import { createClient } from "@redis/client";

import * as env from "~/config/env";

export const redis = createClient({
  url: `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`,
});

redis.on("error", err => console.error("Redis Client Error", err));
redis.on("ready", () => console.log("Connected to Redis successfully!"));
