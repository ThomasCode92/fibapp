import http from "http";

import { app } from "~/app";
import { redis } from "~/clients/redis";
import { PORT } from "~/config/env";

const server = http.createServer(app);

const startServer = async () => {
  await redis.connect(); // establish Redis connection

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
