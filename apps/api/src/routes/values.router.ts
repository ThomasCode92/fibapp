import express, { type Router } from "express";

import {
  getAllCalculatedValues,
  getAllValues,
  postValue,
} from "~/controllers/values.controller";

const router: Router = express.Router();

router.route("/").get(getAllValues).post(postValue);
router.route("/calculated").get(getAllCalculatedValues);

export default router;
