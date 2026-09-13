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
      <div className="footer-column"><strong>Explore</strong><a href="/#explore">Explore Hands Gifted</a><a href="/programs">Development Lanes</a><a href="/academy">Family Academy</a><a href="/about">About</a></div>
      <div className="footer-column"><strong>Public</strong><a href="/shop">Shop</a><a href="/services">Services</a><a href="/contact">Contact</a></div>
      <div className="footer-column"><strong>Connect</strong><a href="/#creating">What We’re Creating</a><a href="/contact">Questions & Inquiries</a></div>
      <div className="footer-bottom"><span>HandsGiftedFoundation.com</span><span>Public storytelling and private family information remain intentionally separated.</span></div>
    </footer>
  );
}
