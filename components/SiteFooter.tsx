export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="/">
          <img src="/hands-gifted-logo.png" alt="Hands Gifted Foundation logo" />
          <div><strong>Hands Gifted Foundation</strong><p>Faith · Family · Creativity · Service</p></div>
        </a>
        <p className="footer-summary">Building households, developing gifts, creating practical value, and serving from increasing stability.</p>
      </div>
      <div className="footer-column"><strong>Explore</strong><a href="/#story">Our Story</a><a href="/programs">Programs</a><a href="/academy">Family Academy</a><a href="/#work">Current Work</a></div>
      <div className="footer-column"><strong>Family</strong><a href="/family">Family Sign In</a><a href="/command-center">Parent Command Center</a><a href="/academy">Kids & Academy</a></div>
      <div className="footer-column"><strong>Connect</strong><a href="/#connect">Get Support</a><a href="/#connect">Partner</a><a href="/#connect">Donate Materials</a><a href="/#connect">Follow the Journey</a></div>
      <div className="footer-bottom"><span>HandsGiftedFoundation.com</span><span>Public storytelling and private family data remain intentionally separated.</span></div>
    </footer>
  );
}
