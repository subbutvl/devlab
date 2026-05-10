import { spawn } from "child_process";

import open from "open";

import {
  getAllProjects,
  importProjectFromPath,
  getProjectById,
  removeProjectById,
} from "../services/projectService.js";

import { launchProject, stopProject } from "../services/launcherService.js";

import { runtimeStatuses } from "../managers/runtimeManager.js";

import { runningProjects } from "../managers/runtimeManager.js";

export function getProjects(req, res) {
  const projects = getAllProjects();

  res.json(projects);
}

export function importProject(req, res) {
  try {
    const { projectPath } = req.body;

    if (!projectPath) {
      return res.status(400).json({
        error: "projectPath is required",
      });
    }

    const project = importProjectFromPath(projectPath);

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to import project",
    });
  }
}

export async function runProject(req, res) {
  try {
    const { id } = req.params;

    const project = getProjectById(id);

    if (!project) {
      return res.status(404).json({
        error: "Project not found",
      });
    }

    const result = await launchProject(project);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to run project",
    });
  }
}

export function stopRunningProject(req, res) {
  try {
    const { id } = req.params;

    const result = stopProject(id);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to stop project",
    });
  }
}

export function openInVSCode(req, res) {
  try {
    const { id } = req.params;

    const project = getProjectById(id);

    if (!project) {
      return res.status(404).json({
        error: "Project not found",
      });
    }

    spawn("code", [project.path], {
      shell: true,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to open VS Code",
    });
  }
}

export async function openFolder(req, res) {
  try {
    const { id } = req.params;

    const project = getProjectById(id);

    if (!project) {
      return res.status(404).json({
        error: "Project not found",
      });
    }

    await open(project.path);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to open folder",
    });
  }
}

export function removeProject(req, res) {
  try {
    const { id } = req.params;

    const result = removeProjectById(id);

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to remove project",
    });
  }
}

export function getRuntimeStatuses(req, res) {
  const statuses = {};

  for (const [id, status] of runtimeStatuses.entries()) {
    const runtime = runningProjects.get(id);

    statuses[id] = {
      status,

      url: runtime?.url || null,
    };
  }

  res.json(statuses);
}
