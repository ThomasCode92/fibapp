import supertest from "supertest";

import { app } from "~/app";
import * as redis from "~/clients/redis.client";

describe("GET /values", function () {
  test("should respond with correct content and status code", async function () {
    const { body } = await supertest(app).get("/api/values").expect(200);
    expect(body.data).toEqual([]);
  });
});

describe("GET /values/calculated", function () {
  vi.spyOn(redis.redisClient, "hGetAll").mockResolvedValue({}); // NOTE: can be replaced with a test docker setup

  test("should respond with correct content and status code", async function () {
    const { body } = await supertest(app)
      .get("/api/values/calculated")
      .expect(200);
    expect(body.data).toEqual({});
  });
});

describe("POST /values", function () {
  const publisher = { connect: vi.fn(), publish: vi.fn() };

  // Mock redis client methods
  // NOTE: can be replaced with a test docker setup
  vi.spyOn(redis.redisClient, "hSet").mockResolvedValue(0);
  vi.spyOn(redis.redisClient, "duplicate").mockReturnValue(
    publisher as unknown as ReturnType<typeof redis.redisClient.duplicate>,
  );

  test("should respond with correct content and status code", async function () {
    const { body } = await supertest(app)
      .post("/api/values")
      .send({ index: 10 })
      .expect(201);
    expect(body.message).toBe("data stored successfully");
  });

  test("should store the correct value in the redis cache", async function () {
    await supertest(app).post("/api/values").send({ index: 10 });
    expect(redis.redisClient.hSet).toHaveBeenCalledWith(`values`, `fib:10`, "");
    expect(publisher.publish).toHaveBeenCalledWith("message", "10");
  });

  test("should respond with correct content and status if body is invalid", async function () {
    const { body } = await supertest(app)
      .post("/api/values")
      .send({ index: -10 })
      .expect(422);
    expect(body.message).toBe("validation error");
  });
});
