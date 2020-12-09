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
