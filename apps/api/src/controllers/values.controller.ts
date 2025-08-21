import type { Request, Response } from "express";

import { redisClient } from "~/clients/redis.client";

export async function getAllValues(_req: Request, res: Response) {
  const values: number[] = []; // TODO: get this from the database
  return res.json({ message: "data retrieved successfully", data: values });
}

export async function getAllCalculatedValues(_req: Request, res: Response) {
  const values = await redisClient.hGetAll("values");
  return res.json({ message: "data retrieved successfully", data: values });
}
