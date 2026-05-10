// import { projects } from "../data/projects/projects";

const API_URL = "http://localhost:4000/api/projects";

export async function getAllProjects() {
  const response = await fetch(API_URL);

  return response.json();
}

export async function importProject(projectPath) {
  const response = await fetch(`${API_URL}/import`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      projectPath,
    }),
  });

  return response.json();
}
