"use client";

import { useState } from "react";

const nav = [["Start Here","/#start-here"],["Resources","/resources"],["Programs & Services","/programs"],["About","/about"]] as const;

export function SiteHeader() {
  const [open,setOpen]=useState(false);
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Hands Gifted home"><img className="brand-logo" src="/hands-gifted-logo.jpg" alt="Hands Gifted logo" /><span className="brand-copy"><strong>Hands Gifted</strong><small><a href="/resources">Faith</a> • <a href="/resources/kids-learning">Family</a> • <a href="/skills">Practical Skills</a></small></span></a>
    <nav className="primary-nav" aria-label="Primary navigation">{nav.map(([label,href])=><a key={label} href={href}>{label}</a>)}</nav>
    <div className="header-actions"><button className="menu-button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}><span></span><span></span><span></span></button></div>
    {open&&<div className="mobile-menu"><nav aria-label="Mobile navigation">{nav.map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav></div>}
  </header>;
}
