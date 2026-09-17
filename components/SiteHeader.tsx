"use client";

import { useState } from "react";

const nav = [
  ["Home", "/"],
  ["Kids & Learning", "/resources/kids-learning"],
  ["Life Skills", "/resources/practical-life-skills"],
  ["Family Resources", "/resources"],
  ["Shop", "/shop"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Hands Gifted home">
        <img className="brand-logo" src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
        <span className="brand-copy"><strong>Hands Gifted</strong><small>Children • Family • Faith • Skills</small></span>
      </a>
      <nav className="primary-nav" aria-label="Primary navigation">{nav.map(([label,href])=><a key={label} href={href}>{label}</a>)}</nav>
      <div className="header-actions">
        <a className="button small" href="/resources">Find Resources</a>
        <button className="menu-button" aria-label="Open menu" aria-expanded={open} onClick={()=>setOpen(!open)}><span></span><span></span><span></span></button>
      </div>
      {open && <div className="mobile-menu"><nav aria-label="Mobile navigation">{nav.map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a className="button gold" href="/resources" onClick={()=>setOpen(false)}>Open the resource center</a></div>}
    </header>
  );
}
