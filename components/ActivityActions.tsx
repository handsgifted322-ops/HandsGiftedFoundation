"use client";

import { useEffect, useState } from "react";

export function ActivityActions({ slug }: { slug: string }) {
  const key = `hands-gifted-activity-${slug}`;
  const [done, setDone] = useState(false);
  useEffect(() => { try { setDone(localStorage.getItem(key) === "done"); } catch { /* Storage may be disabled. */ } }, [key]);
  function toggle() {
    const next = !done;
    setDone(next);
    try { if (next) localStorage.setItem(key, "done"); else localStorage.removeItem(key); } catch { /* The button still updates during this visit. */ }
  }
  return <div className="activity-actions"><button type="button" onClick={toggle} aria-pressed={done}>{done ? "✓ Completed — tap to reset" : "Mark as completed"}</button><button type="button" onClick={() => window.print()}>Print activity</button><small>Completion is saved on this device only. No child information is collected.</small></div>;
}
