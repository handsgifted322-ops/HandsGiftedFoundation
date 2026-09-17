const publicAreas = [
  ["Resource Center", "/resources", "Browse the six main resource pathways for children, parents, caregivers, and families."],
  ["Kids & Learning", "/resources/kids-learning", "Education, gifts, technology, creativity, money skills, and opportunities for children."],
  ["Community Resources", "/resources/community-resources", "Verified programs, family assistance, youth opportunities, and community support."],
  ["Shop", "/shop", "Workbooks, planners, digital resources, and other Hands Gifted products as they are released."],
  ["About", "/about", "The child-centered, faith-based purpose and public-resource model behind Hands Gifted."],
] as const;

export function PublicAreaNav() {
  return (
    <section className="public-area-shell" aria-label="Public Hands Gifted website areas">
      <div className="public-area-intro">
        <span>Keep exploring</span>
        <h2>One question can lead to a much deeper learning path.</h2>
        <p>Hands Gifted is designed to let families move from a real need into practical information, scripture study, verified resources, skill development, and deeper tools without exposing private family information.</p>
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
