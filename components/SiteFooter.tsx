export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <a className="footer-brand" href="/">
          <img src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
          <div><strong>Hands Gifted</strong><p>Children · Family · Faith · Skills · Resources</p></div>
        </a>
        <p className="footer-summary">A faith-centered child and family development resource platform connecting practical learning, life skills, scripture study, family support, community resources, and deeper Hands Gifted tools.</p>
      </div>
      <div className="footer-column"><strong>Learn</strong><a href="/resources/kids-learning">Kids & Learning</a><a href="/resources/practical-life-skills">Life Skills</a><a href="/resources/food-wellness">Food & Wellness</a><a href="/resources/household-management">Household Management</a></div>
      <div className="footer-column"><strong>Support</strong><a href="/resources/family-stability">Family Stability</a><a href="/resources/community-resources">Community Resources</a><a href="/resources">Resource Center</a><a href="/contact">Contact</a></div>
      <div className="footer-column"><strong>Go Deeper</strong><a href="/shop">Products</a><a href="/services">Services</a><a href="/about">About Hands Gifted</a></div>
      <div className="footer-bottom"><span>HandsGiftedFoundation.com</span><span>Public resources are kept separate from protected family records and private household systems.</span></div>
    </footer>
  );
}
