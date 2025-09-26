export default function About() {
  return (
    <section>
      <h1>About Me</h1>
      <img
        src="/antonio.jpg"
        alt="Antonio"
        style={{ borderRadius: "50%", margin: "8px 0" }}
      />
      <p>
        Hi, my name is Antonio. I’m a former pro hockey player a passion for
        teamwork and growth, both on and off the ice. When I’m not coaching or
        playing, I love exploring the world of technology and coding
      </p>
      <p>
        <a href="/resume.pdf" target="_blank" rel="noreferrer">
          View Resume (PDF)
        </a>
      </p>
    </section>
  );
}
