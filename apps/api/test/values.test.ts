import supertest from "supertest";

import { Fibonacci } from "@repo/db";
import { app } from "~/app";
import * as redis from "~/clients/redis.client";
import { prisma } from "./mocks/prisma";

// mock the prisma client
// NOTE: can be replaced with a test docker setup
vi.mock("@repo/db", async function () {
  const actual = await vi.importActual<typeof prisma>("./mocks/prisma");
  return { ...actual };
});

describe("GET /values", function () {
  const data: Fibonacci[] = [
    { id: "abc-123", number: 7, createdAt: new Date() },
    { id: "xyz-789", number: 2, createdAt: new Date() },
  ];

  test("should respond with correct content and status code", async function () {
    prisma.fibonacci.findMany.mockResolvedValue(data);
    const { body } = await supertest(app).get("/api/values").expect(200);
    expect(body.data).toEqual([7, 2]);
  });
});

describe("GET /values/calculated", function () {
  // Mock redis client methods
  // NOTE: can be replaced with a test docker setup
  vi.spyOn(redis.redisClient, "hGetAll").mockResolvedValue({});

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

  test("should store the correct value in the database", async function () {
    const createSpy = vi.spyOn(prisma.fibonacci, "create");
    await supertest(app).post("/api/values").send({ index: 10 });
    expect(createSpy).toHaveBeenCalledOnce();
    expect(createSpy).toHaveBeenCalledWith({ data: { number: 10 } });
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
