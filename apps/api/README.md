# API Service

This is the API service that connects to a Redis cache to store and retrieve
Fibonacci numbers.

## 🚀 Getting Started

### Environment Variables

To configure the environment variables, copy the `.env.example` file and update
the values as needed:

```bash
cp .env.example .env.local
```

### Starting the API Service

Make sure the necessary tools are installed, check the root
[README.md](/README.md) for more details. Start both the Redis server and the
API service with the following commands:

```bash
# Start Redis and Postgres in a Docker container
docker run --name redis-server -p 6379:6379 -d --rm redis:alpine
docker run --name postgres --env-file .env.local -p 5432:5432 -d --rm postgres:17

# Migrate the database, using the database package of the monorepo
pnpm run --filter=@repo/db db:migrate

# Start the API Service in development mode
pnpm run dev
```

## 📚 Resources

- [Redis Node.js Client Documentation](https://github.com/redis/node-redis)
- [Redis Pub/Sub Documentation](https://github.com/redis/node-redis/blob/master/docs/pub-sub.md#pubsub)
