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

export function getProjectById(id) {
  const projects = getAllProjects();

  return projects.find((project) => project.id === id);
}

export function importProjectFromPath(projectPath) {
  const projects = getAllProjects();

  const folderName = path.basename(projectPath);

  const frameworkInfo = detectFramework(projectPath);

  // let defaultPort = 5173;

  // if (frameworkInfo.framework === "Angular") {
  //   defaultPort = 4200;
  // }

  // if (frameworkInfo.framework === "Python") {
  //   defaultPort = 8000;
  // }

  const project = {
    id: folderName.toLowerCase().replaceAll(" ", "-"),

    title: folderName,

    description: "Imported project",

    stack: [frameworkInfo.framework],

    framework: frameworkInfo.framework,

    // runCommand: frameworkInfo.runCommand,

    packageManager: frameworkInfo.packageManager,

    runScript: frameworkInfo.runScript,

    status: "active",

    category: frameworkInfo.category,

    favorite: false,

    createdAt: new Date().toISOString(),

    lastOpened: "Never",

    path: projectPath,

    // port: defaultPort,
  };

  projects.push(project);

  saveProjects(projects);

  return project;
}

export function removeProjectById(id) {
  const projects = getAllProjects();

  const filteredProjects = projects.filter((project) => project.id !== id);

  saveProjects(filteredProjects);

  return {
    success: true,
  };
}
