"use client";

import { useState } from "react";

const nav = [
  ["Our Story", "/#story"],
  ["How We Build", "/#path"],
  ["Programs", "/programs"],
  ["Family Academy", "/academy"],
  ["Current Work", "/#work"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Hands Gifted Foundation home">
        <img className="brand-logo" src="/hands-gifted-logo.jpg" alt="Hands Gifted Foundation logo" />
        <span className="brand-copy"><strong>Hands Gifted</strong><small>Foundation</small></span>
      </a>

      <nav className="primary-nav" aria-label="Primary navigation">
        {nav.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
      </nav>

      <div className="header-actions">
        <a className="text-link" href="/family">Family sign in</a>
        <a className="button small" href="/#connect">Connect</a>
        <button className="menu-button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
            <a href="/family" onClick={() => setOpen(false)}>Family sign in</a>
            <a href="/command-center" onClick={() => setOpen(false)}>Parent Command Center</a>
          </nav>
          <a className="button gold" href="/#connect" onClick={() => setOpen(false)}>Connect with Hands Gifted</a>
        </div>
      )}
    </header>
  );
}
