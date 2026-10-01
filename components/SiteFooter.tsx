export function SiteFooter() {
  return <footer className="site-footer compact-footer">
    <a className="footer-brand" href="/"><img src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" /><div><strong>Hands Gifted</strong></div></a>
    <nav className="footer-quick" aria-label="Footer navigation">
      <a href="/resources#kids-learning">Kids & Learning</a>
      <a href="/resources#family">Family</a>
      <a href="/resources#faith">Faith</a>
      <a href="/skills">Skills</a>
      <a href="/programs">Programs & Services</a>
      <a href="/about">About</a>
    </nav>
  </footer>;
}