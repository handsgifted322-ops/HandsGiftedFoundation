export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="/">
          <img src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
          <div><strong>Hands Gifted</strong><p>Faith · Family · Skills · Opportunity · Service</p></div>
        </a>
        <p className="footer-summary">A faith-centered family-development venture in progress: strengthening connection, developing practical skills, documenting growth, and building opportunities responsibly.</p>
      </div>
      <div className="footer-column"><strong>Explore</strong><a href="/#story">Our Story</a><a href="/programs">Development Lanes</a><a href="/academy">Family Academy</a><a href="/#work">Current Work</a></div>
      <div className="footer-column"><strong>Family</strong><a href="/family">Family Sign In</a><a href="/command-center">Parent Command Center</a><a href="/academy">Children & Academy</a></div>
      <div className="footer-column"><strong>Connect</strong><a href="/#connect">Follow the Journey</a><a href="/#connect">Connect</a><a href="/#connect">Share Resources</a></div>
      <div className="footer-bottom"><span>HandsGiftedFoundation.com</span><span>Public storytelling and private family information remain intentionally separated.</span></div>
    </footer>
  );
}
