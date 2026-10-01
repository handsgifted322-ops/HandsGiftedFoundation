export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="/">
          <img src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
          <div><strong>Hands Gifted</strong></div>
        </a>
      </div>
      <div className="footer-column"><strong>Children & Family</strong><a href="/resources#kids-learning">Kids & Learning</a><a href="/resources#family">Family Resources</a><a href="/resources/community-resources">Community Resources</a><a href="/resources#faith">Bible & Faith</a></div>
      <div className="footer-column"><strong>Hands Gifted Skills</strong><a href="/skills">Cooking</a><a href="/skills">Gardening</a><a href="/skills">Braiding</a><a href="/skills">Sewing</a></div>
      <div className="footer-column"><strong>Hands Gifted</strong><a href="/programs">Programs & Services</a><a href="/about">About</a><a href="/contact">Contact</a></div>
    </footer>
  );
}
