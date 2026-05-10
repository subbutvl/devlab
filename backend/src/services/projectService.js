import fs from "fs";
import path from "path";

import { detectFramework } from "../utils/detectFramework.js";

const registryPath = path.resolve("src/data/projects.json");

export function getAllProjects() {
  const data = fs.readFileSync(registryPath, "utf-8");

  return JSON.parse(data);
}

export function saveProjects(projects) {
  fs.writeFileSync(registryPath, JSON.stringify(projects, null, 2));
}

export function importProjectFromPath(projectPath) {
  const projects = getAllProjects();

  const folderName = path.basename(projectPath);

  const frameworkInfo = detectFramework(projectPath);

  const project = {
    id: folderName.toLowerCase(),

    title: folderName,

    description: "Imported project",

    stack: [frameworkInfo.framework],

    status: "active",

    category: frameworkInfo.category,

    favorite: false,

    createdAt: new Date().toISOString(),

    lastOpened: "Never",

    path: projectPath,
  };

  projects.push(project);

  saveProjects(projects);

  return project;
}
