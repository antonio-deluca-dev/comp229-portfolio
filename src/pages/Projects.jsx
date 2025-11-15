// src/pages/Projects.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

const ADMIN_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTdjNmVmYzhiMmMwZGVjOWRmMTYyNSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MzE2ODAwNiwiZXhwIjoxNzYzMjU0NDA2fQ.2K7TeOzr_CwAbVGy8YRMphGmUzoyVO8oXitBEBKEJg4";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/projects`);
        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ADMIN_TOKEN}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("Title and description are required");
      return;
    }

    try {
      const body = JSON.stringify({ title, description, link });

      let url = `${API_BASE}/projects`;
      let method = "POST";

      if (editingId) {
        url = `${API_BASE}/projects/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to save project");
      }

      const saved = await res.json();

      if (editingId) {
        setProjects((prev) =>
          prev.map((p) => (p._id === saved._id ? saved : p))
        );
      } else {
        setProjects((prev) => [saved, ...prev]);
      }

      // clear form
      setTitle("");
      setDescription("");
      setLink("");
      setEditingId(null);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error saving project");
    }
  };

  // 3. Edit button
  const startEdit = (project) => {
    setTitle(project.title || "");
    setDescription(project.description || "");
    setLink(project.link || "");
    setEditingId(project._id);
  };

  // 4. Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || "Failed to delete project");
      }

      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message || "Error deleting project");
    }
  };

  return (
    <div>
      <h1>Projects</h1>

      {loading && <p>Loading projects...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Admin form */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>{editingId ? "Edit Project" : "Add New Project"} (Admin)</h2>
        <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
          <div style={{ marginBottom: 8 }}>
            <label>
              Title:
              <input
                style={{ width: "100%" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>
              Description:
              <textarea
                style={{ width: "100%", minHeight: 80 }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div style={{ marginBottom: 8 }}>
            <label>
              Link (optional):
              <input
                style={{ width: "100%" }}
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </label>
          </div>

          <button type="submit">
            {editingId ? "Update Project" : "Create Project"}
          </button>

          {editingId && (
            <button
              type="button"
              style={{ marginLeft: 8 }}
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setDescription("");
                setLink("");
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      {/* List of projects */}
      <section>
        <h2>All Projects</h2>
        {projects.length === 0 && !loading && <p>No projects yet.</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {projects.map((p) => (
            <li
              key={p._id}
              style={{
                border: "1px solid #444",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              {p.link && (
                <p>
                  <a href={p.link} target="_blank" rel="noreferrer">
                    View project
                  </a>
                </p>
              )}

              {/* Admin controls */}
              <button onClick={() => startEdit(p)}>Edit</button>
              <button
                style={{ marginLeft: 8 }}
                onClick={() => handleDelete(p._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
