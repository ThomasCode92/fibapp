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
# Start Redis in a Docker container
docker run --name redis-server -p 6379:6379 -d redis

# Start the API Service in development mode
pnpm run dev
```

## 📚 Resources

- [Redis Node.js Client Documentation](https://github.com/redis/node-redis)
- [Redis Pub/Sub Documentation](https://github.com/redis/node-redis/blob/master/docs/pub-sub.md#pubsub)
