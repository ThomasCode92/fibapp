# Worker Service

This service connects to a Redis server and performs background operations using
a Redis client.

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
Worker Service with the following commands:

```bash
# Start Redis in a Docker container
docker run --name redis-server -p 6379:6379 -d redis

# Start the Worker Service in development mode
pnpm run dev
```

## 📚 Resources

- [Redis Node.js Client Documentation](https://github.com/redis/node-redis)
- [Redis Pub/Sub Documentation](https://github.com/redis/node-redis/blob/master/docs/pub-sub.md#pubsub)
