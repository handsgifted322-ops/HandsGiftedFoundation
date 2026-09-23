"use client";

import { useState } from "react";

const nav = [
  ["Learn", "/resources"],
  ["Programs", "/services"],
  ["Services", "/book"],
  ["Shop", "/shop"],
  ["Our Work", "/skills"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Hands Gifted home">
        <img className="brand-logo" src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
        <span className="brand-copy"><strong>Hands Gifted</strong><small>Faith · Family · Development</small></span>
      </a>
      <nav className="primary-nav" aria-label="Primary navigation">{nav.map(([label,href])=><a key={label} href={href}>{label}</a>)}</nav>
      <div className="header-actions">
        <a className="text-link" href="/family">Sign In</a>
        <a className="button small" href="/family">My Hands Gifted</a>
        <button className="menu-button" aria-label="Open menu" aria-expanded={open} onClick={()=>setOpen(!open)}><span></span><span></span><span></span></button>
      </div>
      {open && <div className="mobile-menu"><nav aria-label="Mobile navigation">{nav.map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a href="/family" onClick={()=>setOpen(false)}>Sign In</a><a className="button gold" href="/family" onClick={()=>setOpen(false)}>My Hands Gifted</a></div>}
    </header>
  );
}
