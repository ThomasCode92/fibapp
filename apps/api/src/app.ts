import express, { type Express } from "express";

import routes from "~/routes";

export const app: Express = express();

// general middleware
app.use(express.json());

// routes
app.use("/api", routes);
