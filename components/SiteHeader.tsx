"use client";
import { useState } from "react";
const nav=[["Home","/"],["Women","/women"],["Children","/children"],["Family & Home","/family-home"],["Skills","/#skills"],["Bible & Faith","/bible-faith"],["Resources","/#resources"],["Contact","/contact"]] as const;
export function SiteHeader(){const[open,setOpen]=useState(false);return <header className="site-header hg-clean-header">
 <a className="brand-home" href="/" aria-label="Hands Gifted home"><img className="brand-logo" src="/hands-gifted-logo.jpg" alt="Hands Gifted logo"/><span className="brand-copy"><strong>Hands Gifted</strong></span></a>
 <nav className="primary-nav" aria-label="Primary navigation">{nav.map(([l,h])=><a key={l} href={h}>{l}</a>)}</nav>
 <button className="menu-button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/><span/></button>
 {open&&<div className="mobile-menu"><nav aria-label="Mobile navigation">{nav.map(([l,h])=><a key={l} href={h} onClick={()=>setOpen(false)}>{l}</a>)}</nav></div>}
 </header>}