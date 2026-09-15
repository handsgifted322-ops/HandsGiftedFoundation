const publicAreas = [
  ["Home", "/", "The current Hands Gifted family-business starting point."],
  ["Shop", "/shop", "Products and digital resources being prepared for release."],
  ["Services", "/services", "What can be requested now and what is still in development."],
  ["About", "/about", "Why the business starts with our own household first."],
  ["Contact", "/contact", "Questions, inquiries, future collaborations, and updates."],
] as const;

export function PublicAreaNav() {
  return (
    <section className="public-area-shell" aria-label="Public Hands Gifted website areas">
      <div className="public-area-intro">
        <span>Public website</span>
        <h2>Know what is real, what is ready, and what is still being built.</h2>
        <p>The public website documents the family business honestly. Private household systems stay protected, while products, services, skills, and development work are shared according to their actual status.</p>
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
