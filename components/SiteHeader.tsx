"use client";

import { useState } from "react";

const nav = [
  ["Home", "/"],
  ["Explore", "/#explore"],
  ["What We’re Creating", "/#creating"],
  ["Academy", "/explore/academy"],
  ["Our Story", "/#story"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Hands Gifted home">
        <img className="brand-logo" src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" />
        <span className="brand-copy"><strong>Hands Gifted</strong><small>Family Development</small></span>
      </a>
      <nav className="primary-nav" aria-label="Primary navigation">{nav.map(([label,href])=><a key={label} href={href}>{label}</a>)}</nav>
      <div className="header-actions">
        <a className="button small" href="/#connect">Connect</a>
        <button className="menu-button" aria-label="Open menu" aria-expanded={open} onClick={()=>setOpen(!open)}><span></span><span></span><span></span></button>
      </div>
      {open && <div className="mobile-menu"><nav aria-label="Mobile navigation">{nav.map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}<a href="/family" onClick={()=>setOpen(false)}>Family access</a><a href="/command-center" onClick={()=>setOpen(false)}>Parent Command Center</a></nav><a className="button gold" href="/#connect" onClick={()=>setOpen(false)}>Connect with Hands Gifted</a></div>}
    </header>
  );
}
