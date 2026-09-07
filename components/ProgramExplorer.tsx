"use client";

import { useMemo, useState } from "react";
import { programs } from "../lib/catalog";

const statuses: Record<string, string> = {
  active: "Active",
  in_development: "In development",
  planned: "Planned",
  in_progress: "In progress",
};

export function ProgramExplorer() {
  const categories = ["All", ...Array.from(new Set(programs.map((p) => p.category)))];
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => programs.filter((program) => {
    const categoryMatch = category === "All" || program.category === category;
    const q = query.trim().toLowerCase();
    const queryMatch = !q || `${program.name} ${program.description} ${program.category}`.toLowerCase().includes(q);
    return categoryMatch && queryMatch;
  }), [category, query]);

  return (
    <div className="explorer">
      <div className="explorer-controls">
        <label className="search-label">
          <span>Search the ecosystem</span>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try: sewing, youth, stability…" />
        </label>
        <div className="chips" aria-label="Program categories">
          {categories.map((item) => (
            <button className={category === item ? "chip active" : "chip"} key={item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </div>
      <div className="program-grid">
        {shown.map((program) => (
          <article className="program-card" key={program.name}>
            <div className="program-meta"><span>{program.category}</span><span className={`status ${program.status}`}>{statuses[program.status]}</span></div>
            <h3>{program.name}</h3>
            <p>{program.description}</p>
          </article>
        ))}
      </div>
      {!shown.length && <p className="empty">No programs match that filter.</p>}
    </div>
  );
}
