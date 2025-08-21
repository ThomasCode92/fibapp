import http from "http";

import { app } from "~/app";
import { redisClient } from "~/clients/redis.client";
import { PORT } from "~/config/env";

const server = http.createServer(app);

const startServer = async () => {
  await redisClient.connect(); // establish Redis connection

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
