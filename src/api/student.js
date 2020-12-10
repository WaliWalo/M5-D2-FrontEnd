export async function getAllStudent() {
  try {
    const response = await fetch("http://localhost:3001/students", {
      method: "GET",
    });
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      const error = await response.json();

      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getSingleStudent(id) {
  try {
    const response = await fetch(`http://localhost:3001/students/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      const error = await response.json();

      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function postStudent(student) {
  try {
    const response = await fetch(`http://localhost:3001/students/`, {
      method: "POST",
      body: JSON.stringify(student),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return "An account has been created with the same email address!";
    } else if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      const error = await response.json();

      return error;
    }
  } catch (error) {
    return error;
  }
}

export async function putStudent(student, id) {
  try {
    const response = await fetch(`http://localhost:3001/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(student),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      const error = await response.json();

      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteStudent(id) {
  try {
    const response = await fetch(`http://localhost:3001/students/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      return "Student Deleted";
    } else {
      const error = await response.json();

      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getStudentProjects(id) {
  try {
    const response = await fetch(
      `http://localhost:3001/students/${id}/projects`,
      {
        method: "GET",
      }
    );
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

export async function postStudentImg(id, file) {
  try {
    console.log(file);
    let formData = new FormData();
    formData.append("avatar", file, file.name);
    const response = await fetch(
      `http://localhost:3001/students/${id}/uploadPhoto`,
      { method: "POST", body: formData }
    );
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

export async function getProfileImg(id) {
  try {
    const response = await fetch(
      `http://localhost:3001/students/${id}/uploadPhoto`,
      {
        method: "GET",
      }
    );
    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      const error = response.json();
      return error;
    }
  } catch (error) {
    return error;
  }
}
