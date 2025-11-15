// src/pages/Contact.jsx
import { useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState(""); // success text
  const [error, setError] = useState(""); // error text
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setStatus("Your message has been sent!");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ color: "white", padding: "2rem 0" }}>
      <h1>Contact Me</h1>
      <p>If you&apos;d like to reach out, fill in the form below.</p>

      {status && <p style={{ color: "lightgreen" }}>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        <label>
          Name
          <input
            type="text"
            value={name}
            style={{ width: "100%" }}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            style={{ width: "100%" }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Message
          <textarea
            value={message}
            style={{ width: "100%", minHeight: 100 }}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
