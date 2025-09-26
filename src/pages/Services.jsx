export default function Services() {
  const services = [
    "Web Development",
    "UI Implementation",
    "General Programming",
  ];
  return (
    <section>
      <h1>Services</h1>
      <ul>
        {services.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
