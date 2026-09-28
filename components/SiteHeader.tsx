"use client";
import { useState } from "react";
const groups=[
 {label:"Children & Learning",href:"/resources/kids-learning",children:[["Activities","/activities"]]},
 {label:"Family & Home",href:"/resources/household-management",children:[["Community Resources","/resources/community-resources"],["All Resources","/resources"]]},
 {label:"Life Skills",href:"/skills",children:[["Services","/services"],["Shop","/shop"]]},
 {label:"About",href:"/about",children:[["Contact","/contact"]]},
] as const;
export function SiteHeader(){const[open,setOpen]=useState(false);const[expanded,setExpanded]=useState<string|null>(null);return <header className="site-header"><a className="brand" href="/" aria-label="Hands Gifted home"><img className="brand-logo" src="/hands-gifted-logo.jpg" alt="Hands Gifted logo"/><span className="brand-copy"><strong>Hands Gifted</strong><small>Children • Family • Faith • Skills</small></span></a>
<nav className="primary-nav" aria-label="Primary navigation">{groups.map(g=><a key={g.label} href={g.href}>{g.label}</a>)}</nav>
<div className="header-actions"><a className="button small" href="/family">Private Sign In</a><button className="menu-button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/><span/></button></div>
{open&&<div className="mobile-menu"><nav aria-label="Mobile navigation">{groups.map(g=><div className="mobile-nav-group" key={g.label}><div className="mobile-nav-parent"><a href={g.href} onClick={()=>setOpen(false)}>{g.label}</a><button aria-label={`Show links under ${g.label}`} aria-expanded={expanded===g.label} onClick={()=>setExpanded(expanded===g.label?null:g.label)}>{expanded===g.label?"−":"+"}</button></div>{expanded===g.label&&<div className="mobile-nav-children">{g.children.map(([l,h])=><a key={l} href={h} onClick={()=>setOpen(false)}>{l}</a>)}</div>}</div>)}</nav><a className="button gold" href="/family" onClick={()=>setOpen(false)}>Private Family Sign In</a></div>}</header>}