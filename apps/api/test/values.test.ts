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
