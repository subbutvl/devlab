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

export async function runProject(id) {
  const response = await fetch(`${API_URL}/${id}/run`, {
    method: "POST",
  });

  return response.json();
}

export async function stopProject(id) {
  const response = await fetch(`${API_URL}/${id}/stop`, {
    method: "POST",
  });

  return response.json();
}

export async function openVSCode(id) {
  const response = await fetch(`${API_URL}/${id}/code`, {
    method: "POST",
  });

  return response.json();
}

export async function openFolder(id) {
  const response = await fetch(`${API_URL}/${id}/folder`, {
    method: "POST",
  });

  return response.json();
}

export async function removeProject(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return response.json();
}

export async function getRuntimeStatuses() {
  const response = await fetch(`${API_URL}/runtime/status`);

  return response.json();
}
