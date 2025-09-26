export default function Education() {
  const items = [
    {
      place: "Centennial College",
      program: "COMP229 – Web Application Development",
      years: "2025",
      credential: "In progress",
    },
  ];
  return (
    <section>
      <h1>Education</h1>
      <ul>
        {items.map((i) => (
          <li key={i.place}>
            {i.place} • {i.program} • <strong>Year(s):</strong> {i.years} •{" "}
            <strong>Credential:</strong> {i.credential}
          </li>
        ))}
      </ul>
    </section>
  );
}
