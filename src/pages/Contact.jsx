export default function Contact() {
  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("Captured:", data);
    window.location.href = "/"; // redirect back to Home
  }
  return (
    <section>
      <h1>Contact Me</h1>
      <div>
        <strong>Email:</strong> you@example.com • <strong>Phone:</strong> (555)
        555-5555
      </div>
      <form onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input name="firstName" placeholder="First Name" required />
          <input name="lastName" placeholder="Last Name" required />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input name="phone" placeholder="Contact Number" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
        </div>
        <textarea
          name="message"
          rows="4"
          placeholder="Message..."
          style={{ width: "100%", marginTop: 8 }}
        />
        <button type="submit" style={{ marginTop: 8 }}>
          Send Message
        </button>
      </form>
    </section>
  );
}
