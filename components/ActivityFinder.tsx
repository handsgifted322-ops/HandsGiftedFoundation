"use client";

import { useState } from "react";
import { activities } from "../lib/activities";

const topics = ["All topics", "Cooking", "Gardening", "Sewing", "Creative gifts", "Family faith"] as const;

export function ActivityFinder() {
  const [topic, setTopic] = useState<string>("All topics");
  const [age, setAge] = useState<string>("All ages");
  const [query, setQuery] = useState("");
  const shown = activities.filter((item) =>
    (topic === "All topics" || item.topic === topic) &&
    (age === "All ages" || (item.minAge <= Number(age) && item.maxAge >= Number(age))) &&
    `${item.title} ${item.summary} ${item.topic}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return <>
    <div className="activity-filters">
      <label>Search activities<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try cooking, faith, or sewing" /></label>
      <label>Topic<select value={topic} onChange={(event) => setTopic(event.target.value)}>{topics.map((option) => <option key={option}>{option}</option>)}</select></label>
      <label>Child&apos;s age<select value={age} onChange={(event) => setAge(event.target.value)}><option>All ages</option>{Array.from({ length: 13 }, (_, index) => index + 5).map((value) => <option value={value} key={value}>{value}</option>)}</select></label>
    </div>
    <p className="activity-count" aria-live="polite">{shown.length} {shown.length === 1 ? "activity" : "activities"} found</p>
    <div className="activity-grid">{shown.map((item) => <a className="activity-card" key={item.slug} href={`/activities/${item.slug}`}><span>{item.topic} · Ages {item.ages} · {item.minutes} min</span><h2>{item.title}</h2><p>{item.summary}</p><strong>Start this activity →</strong></a>)}</div>
    {shown.length === 0 && <p className="activity-empty">No activities match those choices. Try another age or topic.</p>}
  </>;
}
