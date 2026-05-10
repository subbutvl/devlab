import express from "express";

import {
  getProjects,
  importProject,
  runProject,
  stopRunningProject,
  openInVSCode,
  openFolder,
  removeProject,
  getRuntimeStatuses,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.post("/import", importProject);

router.post("/:id/run", runProject);

router.post("/:id/stop", stopRunningProject);

router.post("/:id/code", openInVSCode);

router.post("/:id/folder", openFolder);

router.delete("/:id", removeProject);

router.get("/runtime/status", getRuntimeStatuses);

export default router;
