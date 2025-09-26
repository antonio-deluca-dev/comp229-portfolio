import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "10px 16px",
        borderBottom: "1px solid #ddd",
      }}
    >
      <img
        src="/logo.svg"
        alt="Logo"
        width="28"
        height="28"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/projects">Projects</NavLink>
      <NavLink to="/education">Education</NavLink>
      <NavLink to="/services">Services</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </nav>
  );
}
