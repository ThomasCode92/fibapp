import express, { type Express } from "express";

const app: Express = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello from the API!" });
});

export { app };
