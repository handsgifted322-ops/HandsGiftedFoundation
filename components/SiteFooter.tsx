export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="/">
          <img src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
          <div><strong>Hands Gifted</strong><p>Faith · Family · Development</p></div>
        </a>
        <p className="footer-summary">A faith-centered family development organization connecting knowledge, practical development, creativity, resources, and real-life application.</p>
      </div>
      <div className="footer-column"><strong>Explore</strong><a href="/resources">Learn</a><a href="/skills">Skills</a><a href="/services">Programs & Services</a><a href="/shop">Shop</a></div>
      <div className="footer-column"><strong>Hands Gifted</strong><a href="/about">About</a><a href="/skills">Our Work</a><a href="/contact">Contact</a><a href="/book">Request a Service</a></div>
      <div className="footer-column"><strong>My Hands Gifted</strong><a href="/family">Sign In</a><a href="/family">Account Access</a><a href="/family/academy/world">Family Academy</a></div>
      <div className="footer-bottom"><span>HandsGiftedFoundation.com</span><span>Public discovery and protected personal/family work remain intentionally separated.</span></div>
    </footer>
  );
}
