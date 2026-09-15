export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="/">
          <img src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
          <div><strong>Hands Gifted</strong><p>Faith · Family First · Skills · Opportunity · Responsible Growth</p></div>
        </a>
        <p className="footer-summary">A faith-led, family-owned business in development. We build from real household needs, strengthen skills through practice, create proof, and grow products, services, and opportunities responsibly.</p>
      </div>
      <div className="footer-column"><strong>Explore</strong><a href="/#builds">What We&apos;re Building</a><a href="/programs">Development Lanes</a><a href="/academy">Family Academy</a><a href="/about">About</a></div>
      <div className="footer-column"><strong>Public</strong><a href="/shop">Shop</a><a href="/services">Services</a><a href="/contact">Contact</a></div>
      <div className="footer-column"><strong>Direction</strong><a href="/about">Family-First Model</a><a href="/contact">Questions & Inquiries</a></div>
      <div className="footer-bottom"><span>HandsGiftedFoundation.com</span><span>Hands Gifted is the working family-owned business brand. Private family information remains protected.</span></div>
    </footer>
  );
}
