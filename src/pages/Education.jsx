// src/pages/Education.jsx
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

// ⚠️ PASTE YOUR REAL ADMIN JWT TOKEN HERE
const ADMIN_TOKEN = "PASTE_YOUR_JWT_TOKEN_HERE";

export default function Education() {
  const [quals, setQuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state
  const [school, setSchool] = useState("");
  const [program, setProgram] = useState("");
  const [level, setLevel] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Load qualifications
  useEffect(() => {
    const fetchQuals = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_BASE}/qualifications`);
        if (!res.ok) throw new Error("Failed to fetch qualifications");
        const data = await res.json();
        setQuals(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error loading qualifications");
      } finally {
        setLoading(false);
      }
    };

    fetchQuals();
  }, []);

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ADMIN_TOKEN}`,
  };

  const resetForm = () => {
    setSchool("");
    setProgram("");
    setLevel("");
    setStartYear("");
    setEndYear("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!school || !program) {
      setError("School and program are required");
      return;
    }

    try {
      const body = JSON.stringify({
        school,
        program,
        level,
        startYear: startYear ? Number(startYear) : undefined,
        endYear: endYear ? Number(endYear) : undefined,
        description,
      });

      let url = `${API_BASE}/qualifications`;
      let method = "POST";

      if (editingId) {
        url = `${API_BASE}/qualifications/${editingId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to save entry");

      if (editingId) {
        setQuals((prev) => prev.map((q) => (q._id === data._id ? data : q)));
      } else {
        setQuals((prev) => [data, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      setError(err.message || "Error saving qualification");
    }
  };

  const startEdit = (q) => {
    setSchool(q.school || "");
    setProgram(q.program || "");
    setLevel(q.level || "");
    setStartYear(q.startYear || "");
    setEndYear(q.endYear || "");
    setDescription(q.description || "");
    setEditingId(q._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this qualification?")) return;

    try {
      const res = await fetch(`${API_BASE}/qualifications/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to delete entry");

      setQuals((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message || "Error deleting qualification");
    }
  };

  return (
    <div style={{ color: "white", padding: "2rem 0" }}>
      <h1>Education / Qualifications</h1>

      {loading && <p>Loading qualifications...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Admin form */}
      <section style={{ marginBottom: "2rem" }}>
        <h2>
          {editingId ? "Edit Qualification" : "Add Qualification"} (Admin)
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <label>
            School
            <input
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Program
            <input
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>

          <label>
            Level (e.g. Diploma, Degree)
            <input
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              style={{ width: "100%" }}
            />
          </label>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <label style={{ flex: 1 }}>
              Start Year
              <input
                type="number"
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                style={{ width: "100%" }}
              />
            </label>

            <label style={{ flex: 1 }}>
              End Year
              <input
                type="number"
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                style={{ width: "100%" }}
              />
            </label>
          </div>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ width: "100%", minHeight: 80 }}
            />
          </label>

          <div>
            <button type="submit">{editingId ? "Update" : "Create"}</button>
            {editingId && (
              <button
                type="button"
                style={{ marginLeft: 8 }}
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Public list */}
      <section>
        <h2>My Education</h2>
        {quals.length === 0 && !loading && <p>No qualifications yet.</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {quals.map((q) => (
            <li
              key={q._id}
              style={{
                border: "1px solid #444",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <h3>
                {q.school} – {q.program}
              </h3>
              <p>
                {q.level && <>{q.level} · </>}
                {q.startYear} – {q.endYear || "Present"}
              </p>
              {q.description && <p>{q.description}</p>}

              <button onClick={() => startEdit(q)}>Edit</button>
              <button
                style={{ marginLeft: 8 }}
                onClick={() => handleDelete(q._id)}
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
