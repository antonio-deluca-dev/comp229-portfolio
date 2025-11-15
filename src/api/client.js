const API_BASE = "http://localhost:5000/api";

// Helper for requests WITH optional token
async function request(path, options = {}, token) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

/** Sign in (gets you a token) */
export function signin(email, password) {
  return request("/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/** Public contact form */
export function createContact(formData) {
  return request("/contacts", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

/** 📂 Public projects list */
export function fetchProjects() {
  return request("/projects", { method: "GET" });
}

/** Public qualifications list */
export function fetchQualifications() {
  return request("/qualifications", { method: "GET" });
}

/** Admin: create project (requires token) */
export function createProject(project, token) {
  return request(
    "/projects",
    {
      method: "POST",
      body: JSON.stringify(project),
    },
    token
  );
}
