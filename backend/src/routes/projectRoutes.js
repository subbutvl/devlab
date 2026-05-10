import express from "express";

import {
  getProjects,
  importProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/import", importProject);

export default router;
