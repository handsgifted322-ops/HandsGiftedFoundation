export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="/">
          <img src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
          <div><strong>Hands Gifted</strong><p>Children · Family · Faith · Skills · Resources</p></div>
        </a>
        <p className="footer-summary">A faith-centered child and family development platform where families can learn, explore practical skills, use free resources, request Hands Gifted services, and discover original products as they are developed.</p>
      </div>
      <div className="footer-column"><strong>Children & Family</strong><a href="/resources/kids-learning">Kids & Learning</a><a href="/resources">Family Resources</a><a href="/resources/community-resources">Community Resources</a><a href="/resources/kids-learning#scripture">Bible & Faith</a></div>
      <div className="footer-column"><strong>Hands Gifted Skills</strong><a href="/skills/cooking">Cooking</a><a href="/skills/gardening">Gardening</a><a href="/skills/braiding">Braiding</a><a href="/skills/sewing">Sewing</a></div>
      <div className="footer-column"><strong>Work With Hands Gifted</strong><a href="/book">Book / Request Service</a><a href="/shop">Products</a><a href="/services">Services</a><a href="/about">About</a><a href="/contact">Contact</a></div>
      <div className="footer-bottom"><span>HandsGiftedFoundation.com</span><span>Public resources and services remain separate from protected family records and private household systems.</span></div>
    </footer>
  );
}
