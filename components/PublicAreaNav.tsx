const publicAreas = [
  ["Home", "/", "The public Hands Gifted starting point."],
  ["Shop", "/shop", "Digital products and future Hands Gifted goods."],
  ["Services", "/services", "Current availability and services in development."],
  ["About", "/about", "The family-first purpose and development model."],
  ["Contact", "/contact", "Questions, inquiries, collaborations, and updates."],
] as const;

export function PublicAreaNav() {
  return (
    <section className="public-area-shell" aria-label="Public Hands Gifted website areas">
      <div className="public-area-intro">
        <span>Public website</span>
        <h2>Five clear places to start.</h2>
        <p>The existing Hands Gifted catalog and development content stays in place. These public areas make it easier for visitors to find what they need quickly.</p>
      </div>
      <nav className="public-area-grid">
        {publicAreas.map(([label, href, description], index) => (
          <a className="public-area-card" href={href} key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <p>{description}</p>
            <small>Open →</small>
          </a>
        ))}
      </nav>
    </section>
  );
}
