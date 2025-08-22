import express, { type Router } from "express";

import {
  getAllCalculatedValues,
  getAllValues,
} from "~/controllers/values.controller";

const router: Router = express.Router();

router.route("/").get(getAllValues);
router.route("/calculated").get(getAllCalculatedValues);

export default router;
