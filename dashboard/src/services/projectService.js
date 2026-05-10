import { projects } from "../data/projects/projects";

export function getAllProjects() {
  return projects;
}

export function getFavoriteProjects() {
  return projects.filter((project) => project.favorite);
}

export function getActiveProjects() {
  return projects.filter((project) => project.status === "active");
}

export function getArchivedProjects() {
  return projects.filter((project) => project.status === "archived");
}
