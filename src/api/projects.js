export async function getAllProjects() {
  try {
    const response = await fetch("http://localhost:3001/projects", {
      method: "GET",
    });
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      const error = await response.json();

      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function postProject(project) {
  try {
    const response = await fetch("http://localhost:3001/projects", {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const error = await response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function deleteProject(id) {
  try {
    const response = await fetch(`http://localhost:3001/projects/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return "Project Deleted";
    } else {
      const error = await response.json();

      return error;
    }
  } catch (error) {
    return error;
  }
}
