import express, { type Router } from "express";

import valuesRouter from "~/routes/values.router";

const router: Router = express.Router();

router.use("/values", valuesRouter);

export default router;
