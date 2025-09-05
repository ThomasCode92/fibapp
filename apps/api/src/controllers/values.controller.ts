import type { Request, Response } from "express";
import z, { ZodError } from "zod";

import { prisma as prismClient } from "@repo/db";

import { redisClient } from "~/clients/redis.client";
import { IndexSchema, indexSchema } from "~/utils/schema.utils";

export async function getAllValues(_req: Request, res: Response) {
  const data = await prismClient.fibonacci.findMany();
  const values = data.map(d => d.number);
  return res.json({ message: "data retrieved successfully", data: values });
}

export async function getAllCalculatedValues(_req: Request, res: Response) {
  const values = await redisClient.hGetAll("values");
  const data = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key.replace("fib:", ""),
      value,
    ]),
  );
  return res.json({ message: "data retrieved successfully", data });
}

export async function postValue(req: Request, res: Response) {
  try {
    const { index } = indexSchema.parse(req.body);
    const publisher = redisClient.duplicate();

    // insert into redis, and publish the index to the worker
    await publisher.connect();
    await redisClient.hSet("values", `fib:${index}`, "");
    await publisher.publish("message", index.toString());

    await prismClient.fibonacci.create({ data: { number: index } });

    return res.status(201).json({ message: "data stored successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      const { fieldErrors } = z.flattenError(error as ZodError<IndexSchema>);
      return res.status(422).json({
        message: "validation error",
        errors: fieldErrors.index,
      });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}
