import {
  getAllProjects,
  importProjectFromPath,
} from "../services/projectService.js";

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
