# 🔄 Worker Service

This service connects to a Redis server and performs background operations using
a Redis client.

## 📦 Prerequisites

Make sure the following are installed on your machine:

- 🟢 [Node.js](https://nodejs.org/)
- 🧰 [`pnpm`](https://pnpm.io/)
- 🐳 [Docker](https://www.docker.com/)

### 🛠️ Environment Variables

To configure the environment variables, copy the `.env.example` file and update
the values as needed:

```bash
cp .env.example .env.local
```

## 🚀 Starting the Worker Service

Start both the Redis server and the Worker service with the following commands:

```bash
# Start Redis in a Docker container
docker run --name redis-server -p 6379:6379 -d redis

# Start the Worker Service in development mode
pnpm run dev
```

### 🌐 Interacting with Redis Cache

The Redis cache can be inspected or used to publish events for triggering
specific actions in the Worker service.

#### 🕵️ Inspecting Cache Contents

- Open a shell in the Redis container:

  ```bash
  docker exec -it redis-server redis-cli
  ```

- Inside the Redis CLI, list all keys in the cache:

  ```bash
  keys *   # List all keys in the Redis cache
  ```

  > Tip: Commands like `get <key>` or `ttl <key>` assist in inspecting specific
  > keys.

#### 📤 Publishing an Event

- In the Redis CLI shell, publish a message to the `message` channel to trigger
  the Worker service. For example:

  ```bash
  PUBLISH message 10
  ```

  This sends the number `10` to the `message` channel. The Worker service will
  calculate the Fibonacci number for `10` and store the result in Redis.

## 📚 Resources

- [Redis Node.js Client Documentation](https://github.com/redis/node-redis)
- [Redis Pub/Sub Documentation](https://github.com/redis/node-redis/blob/master/docs/pub-sub.md#pubsub)
