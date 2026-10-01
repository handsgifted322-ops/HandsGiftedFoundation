"use client";

import { useState } from "react";
import Link from "next/link";

const keys = [
  ["C", "clear"], ["⌫", "back"], ["%", "percent"], ["÷", "op"],
  ["7", "digit"], ["8", "digit"], ["9", "digit"], ["×", "op"],
  ["4", "digit"], ["5", "digit"], ["6", "digit"], ["−", "op"],
  ["1", "digit"], ["2", "digit"], ["3", "digit"], ["+", "op"],
  ["0", "digit"], [".", "digit"], ["=", "equals"],
] as const;

export default function CalculatorPage() {
  const [display, setDisplay] = useState("0");
  const [stored, setStored] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [replace, setReplace] = useState(false);

  function apply(a: number, b: number, op: string) {
    if (op === "+") return a + b;
    if (op === "−") return a - b;
    if (op === "×") return a * b;
    if (op === "÷") return b === 0 ? null : a / b;
    return b;
  }

  function press(label: string, kind: string) {
    if (kind === "clear") {
      setDisplay("0"); setStored(null); setOperator(null); setReplace(false); return;
    }
    if (kind === "back") {
      if (replace) return;
      setDisplay((v) => v.length <= 1 ? "0" : v.slice(0, -1)); return;
    }
    if (kind === "percent") {
      const n = Number(display);
      if (Number.isFinite(n)) setDisplay(String(n / 100));
      return;
    }
    if (kind === "digit") {
      setDisplay((v) => {
        if (replace) {
          setReplace(false);
          return label === "." ? "0." : label;
        }
        if (label === "." && v.includes(".")) return v;
        if (v === "0" && label !== ".") return label;
        return (v + label).slice(0, 18);
      });
      return;
    }
    if (kind === "op") {
      const current = Number(display);
      if (!Number.isFinite(current)) return;
      if (stored !== null && operator && !replace) {
        const result = apply(stored, current, operator);
        if (result === null) { setDisplay("Cannot divide by 0"); setStored(null); setOperator(null); setReplace(true); return; }
        setStored(result); setDisplay(String(result)); 
      } else {
        setStored(current);
      }
      setOperator(label); setReplace(true); return;
    }
    if (kind === "equals") {
      if (stored === null || !operator) return;
      const current = Number(display);
      const result = apply(stored, current, operator);
      if (result === null) setDisplay("Cannot divide by 0");
      else setDisplay(String(Number(result.toFixed(10))));
      setStored(null); setOperator(null); setReplace(true);
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "32px 18px 80px" }}>
      <div style={{ marginBottom: 20 }}>
        <Link href="/command-center/dashboard">← Back to My Day</Link>
      </div>
      <p style={{ textTransform: "uppercase", letterSpacing: ".12em", fontSize: 12 }}>Dashboard utility</p>
      <h1>Calculator</h1>
      <p>Quick household math for budgets, groceries, recipes, sewing measurements, and everyday calculations.</p>

      <section style={{ marginTop: 28, border: "1px solid rgba(128,128,128,.35)", borderRadius: 18, padding: 18 }}>
        <div aria-live="polite" style={{ minHeight: 74, display: "flex", justifyContent: "flex-end", alignItems: "center", fontSize: 34, fontWeight: 700, overflowWrap: "anywhere", textAlign: "right" }}>
          {display}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 10 }}>
          {keys.map(([label, kind], index) => (
            <button
              key={label}
              type="button"
              onClick={() => press(label, kind)}
              style={{
                minHeight: 54,
                borderRadius: 12,
                border: "1px solid rgba(128,128,128,.35)",
                fontSize: 18,
                fontWeight: 650,
                gridColumn: label === "0" ? "span 2" : undefined,
                gridColumnEnd: label === "=" ? "span 2" : undefined,
                cursor: "pointer"
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
