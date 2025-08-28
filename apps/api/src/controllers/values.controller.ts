import type { Request, Response } from "express";
import z, { ZodError } from "zod";

import { redisClient } from "~/clients/redis.client";
import { IndexSchema, indexSchema } from "~/utils/schema.utils";

export async function getAllValues(_req: Request, res: Response) {
  const values: number[] = []; // TODO: get this from the database
  return res.json({ message: "data retrieved successfully", data: values });
}

export async function getAllCalculatedValues(_req: Request, res: Response) {
  const values = await redisClient.hGetAll("values");
  return res.json({ message: "data retrieved successfully", data: values });
}

export async function postValue(req: Request, res: Response) {
  try {
    const { index } = indexSchema.parse(req.body);
    const publisher = redisClient.duplicate();

    // insert into redis, and publish the index to the worker
    await publisher.connect();
    await redisClient.hSet("values", `fib:${index}`, "");
    await publisher.publish("message", index.toString());

    // TODO: store the index in the database

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
