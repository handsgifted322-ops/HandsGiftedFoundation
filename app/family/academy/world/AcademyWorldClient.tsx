"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { initialAssessmentActionState, submitAcademyAssessment } from "./actions";
import styles from "./academy-world.module.css";

export type AcademyQuestion = { id: string; position: number; text: string; type: string; options: unknown[] };
export type AcademyWorldMission = {
  authenticated: boolean;
  levelNumber: number;
  levelName: string;
  levelDescription: string | null;
  status: string;
  bestScore: number | null;
  attempts: number;
  assignmentTitle: string;
  assignmentInstructions: string | null;
  assessment: null | { id: string; title: string; instructions: string | null; passingScore: number; questions: AcademyQuestion[] };
};

type Zone = { id: string; title: string; subtitle: string; icon: string; status: "current" | "open" | "locked"; x: number; y: number; requirement?: string };
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function AcademyWorldClient({ learnerName = "Learner", roleLabel = "Family Academy", mission }: { learnerName?: string; roleLabel?: string; mission: AcademyWorldMission }) {
  const router = useRouter();
  const viewportRef = useRef<HTMLElement>(null);
  const [avatar, setAvatar] = useState({ x: 50, y: 82 });
  const [selectedId, setSelectedId] = useState("scripture");
  const [showMission, setShowMission] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [assessmentState, assessmentAction, pending] = useActionState(submitAcademyAssessment, initialAssessmentActionState);

  useEffect(() => { if (assessmentState.status === "success") router.refresh(); }, [assessmentState.status, assessmentState.score, router]);

  const zones = useMemo<Zone[]>(() => {
    const level = mission.levelNumber;
    return [
      { id: "scripture", title: "Scripture Hall", subtitle: "Word · Wisdom · Truth", icon: "📖", status: "current", x: 14, y: 19 },
      { id: "family", title: "Family Hall", subtitle: "Relationships · Home · Life", icon: "🏛️", status: level >= 2 ? "open" : "locked", x: 15, y: 36, requirement: "Complete the current Academy level" },
      { id: "garden", title: "Garden Courtyard", subtitle: "Stewardship · Creation · Health", icon: "🌿", status: level >= 3 ? "open" : "locked", x: 17, y: 56, requirement: "Advance through your pathway" },
      { id: "kitchen", title: "Kitchen Lab", subtitle: "Nourish · Create · Provide", icon: "🍲", status: level >= 4 ? "open" : "locked", x: 86, y: 18, requirement: "Advance through your pathway" },
      { id: "creative", title: "Creative Studio", subtitle: "Imagine · Design · Express", icon: "🎨", status: level >= 5 ? "open" : "locked", x: 85, y: 37, requirement: "Advance through your pathway" },
      { id: "technology", title: "Technology Lab", subtitle: "Innovate · Build · Solve", icon: "💻", status: level >= 6 ? "open" : "locked", x: 86, y: 58, requirement: "Reach the required role and age stage" },
    ];
  }, [mission.levelNumber]);

  const selected = zones.find((zone) => zone.id === selectedId) ?? zones[0];
  const nearest = zones.reduce((best, zone) => {
    const distance = Math.hypot(zone.x - avatar.x, zone.y - avatar.y);
    return distance < best.distance ? { zone, distance } : best;
  }, { zone: zones[0], distance: Number.POSITIVE_INFINITY });
  const canInteract = nearest.distance < 13;
  const answeredCount = Object.keys(answers).length;
  const canSubmit = Boolean(mission.assessment && answeredCount === mission.assessment.questions.length);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const center = Math.max(0, (viewport.scrollWidth - viewport.clientWidth) / 2);
    viewport.scrollLeft = center;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || viewport.scrollWidth <= viewport.clientWidth) return;
    const target = viewport.scrollWidth * (avatar.x / 100) - viewport.clientWidth / 2;
    viewport.scrollTo({ left: clamp(target, 0, viewport.scrollWidth - viewport.clientWidth), behavior: "smooth" });
  }, [avatar.x]);

  const move = (dx: number, dy: number) => {
    setAvatar((current) => ({ x: clamp(current.x + dx, 6, 94), y: clamp(current.y + dy, 16, 88) }));
    setShowMission(false);
    setShowTest(false);
  };

  const interact = () => {
    if (!canInteract) return;
    setSelectedId(nearest.zone.id);
    if (nearest.zone.status !== "locked") setShowMission(true);
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      const key = event.key.toLowerCase();
      if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "e"].includes(key)) event.preventDefault();
      if (key === "arrowup" || key === "w") move(0, -3);
      if (key === "arrowdown" || key === "s") move(0, 3);
      if (key === "arrowleft" || key === "a") move(-3, 0);
      if (key === "arrowright" || key === "d") move(3, 0);
      if (key === "e") interact();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return <div className={styles.shell}>
    <section className={styles.gameFrame} ref={viewportRef} aria-label="Hands Gifted Kingdom Academy">
      <div className={styles.kingdomCanvas}>
        <div className={styles.sky}/><div className={styles.sunset}/><div className={styles.mountains}/>
        <div className={styles.upperArcades}/><div className={styles.leftPalace}/><div className={styles.rightPalace}/>
        <div className={styles.mainPalace}><div className={styles.centralGate}/><div className={styles.mainSpire}/><div className={styles.sideSpireLeft}/><div className={styles.sideSpireRight}/></div>
        <div className={styles.waterfallLeft}/><div className={styles.waterfallRight}/>
        <div className={styles.terraceLeft}/><div className={styles.terraceRight}/>
        <div className={styles.bridgeLeft}/><div className={styles.bridgeRight}/>
        <div className={styles.gardenGlowLeft}/><div className={styles.gardenGlowRight}/>
        <div className={styles.royalWalk}/><div className={styles.forecourtFountain}/>
        <div className={styles.worldTitle}><span>♛</span><strong>HANDS GIFTED ACADEMY</strong><small>BUILDING KINGDOM FAMILIES FOR GENERATIONS</small></div>
        <div className={styles.kingdomWords}><span>KNOW</span><span>DEVELOP</span><span>SERVE</span><span>BUILD</span><span>LEAVE A LEGACY</span></div>

        {zones.map((zone) => <button key={zone.id} className={`${styles.destination} ${zone.status === "locked" ? styles.destinationLocked : ""} ${nearest.zone.id === zone.id && canInteract ? styles.destinationNear : ""}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} onClick={() => { setAvatar({ x: zone.x, y: clamp(zone.y + 10, 16, 88) }); setSelectedId(zone.id); setShowMission(false); setShowTest(false); }} aria-label={`${zone.title} ${zone.status}`}>
          <strong>{zone.title}</strong><span>{zone.subtitle}</span><small>{zone.status === "current" ? "CURRENT MISSION" : zone.status === "open" ? "OPEN" : "🔒 LOCKED"}</small>
        </button>)}

        <div className={styles.avatar} style={{ left: `${avatar.x}%`, top: `${avatar.y}%` }} aria-label={`${learnerName} avatar`}><div className={styles.avatarHead}/><div className={styles.avatarRobe}>♛</div><small>{learnerName}</small></div>
      </div>

      <div className={styles.profileHud}><div className={styles.profileOrb}>♛</div><div><strong>{learnerName}</strong><span>{roleLabel}</span><small>Level {mission.levelNumber} · {mission.levelName}</small></div></div>
      <div className={styles.utilityHud}><span>Map</span><span>Rewards</span><span>Journal</span><span>Settings</span></div>
      <div className={styles.missionHud}><span>♛ CURRENT MISSION</span><strong>{mission.assignmentTitle}</strong><small>{canInteract ? (nearest.zone.status === "locked" ? `${nearest.zone.title} is locked` : `Enter ${nearest.zone.title}`) : "Explore the Kingdom"}</small></div>
      <div className={styles.bottomNav}><span>⌂<small>Home</small></span><span>♛<small>Academy</small></span><span>▦<small>Calendar</small></span><span>✉<small>Messages</small></span></div>

      {canInteract ? <button className={styles.interactPrompt} onClick={interact}>{nearest.zone.status === "locked" ? `🔒 ${nearest.zone.title}` : `Enter ${nearest.zone.title}`}</button> : null}
      <div className={styles.mobilePad} aria-label="movement controls"><button onClick={() => move(0, -4)}>▲</button><div><button onClick={() => move(-4, 0)}>◀</button><button onClick={interact}>●</button><button onClick={() => move(4, 0)}>▶</button></div><button onClick={() => move(0, 4)}>▼</button></div>
    </section>

    {selected.status === "locked" && canInteract && nearest.zone.id === selected.id ? <section className={styles.noticeCard}><strong>{selected.title} is still locked.</strong><p>{selected.requirement}</p></section> : null}

    {showMission && selected.status !== "locked" ? <section className={styles.lessonOverlay}>
      <div className={styles.lessonTop}><div><span className={styles.eyebrow}>You entered {selected.title}</span><h2>{selected.id === "scripture" ? mission.levelName : selected.title}</h2></div><button onClick={() => { setShowMission(false); setShowTest(false); }}>Return to Kingdom</button></div>
      {selected.id === "scripture" ? <><p className={styles.missionText}>{mission.levelDescription}</p><div className={styles.questBoard}><h3>{mission.assignmentTitle}</h3><p>{mission.assignmentInstructions}</p><ol><li>Read the mission carefully.</li><li>Open your KJV 1611 and Apocrypha when the mission calls for Scripture.</li><li>Use your study notebook to write discoveries, questions, and what the lesson means for your role.</li><li>Use web research only when the mission permits it, and keep outside research separate from what the Scripture itself says.</li><li>When you feel ready, take the Level Test.</li></ol></div><div className={styles.lessonActions}><button>Need a Hint</button><button>Study Notes</button>{mission.assessment?.questions.length ? <button onClick={() => setShowTest((value) => !value)}>{showTest ? "Close Test" : "Take Level Test"}</button> : <button disabled>Test Being Prepared</button>}</div>{!mission.authenticated ? <p className={styles.previewNote}>Preview mode: sign in to save progress and unlock your personal Kingdom pathway.</p> : null}</> : <p>This destination will load role- and age-appropriate missions from the same Family Academy pathway.</p>}
    </section> : null}

    {showMission && showTest && selected.id === "scripture" && mission.assessment ? <section className={styles.lessonOverlay}>
      <span className={styles.eyebrow}>Level assessment</span><h2>{mission.assessment.title}</h2>{mission.assessment.instructions ? <p>{mission.assessment.instructions}</p> : null}
      <form action={assessmentAction}><input type="hidden" name="assessment_id" value={mission.assessment.id}/><input type="hidden" name="answers_json" value={JSON.stringify(answers)}/><div className={styles.quizList}>{mission.assessment.questions.map((question) => <fieldset key={question.id} className={styles.questionCard}><legend>{question.position}. {question.text}</legend>{question.options.map((option, optionIndex) => { const display = typeof option === "boolean" ? (option ? "True" : "False") : String(option); const checked = JSON.stringify(answers[String(question.position)]) === JSON.stringify(option); return <label key={`${question.id}-${optionIndex}`} className={styles.answerOption}><input type="radio" name={`question-${question.position}`} checked={checked} onChange={() => setAnswers((current) => ({ ...current, [String(question.position)]: option }))}/><span>{display}</span></label>; })}</fieldset>)}</div><div className={styles.testFooter}><span>{answeredCount}/{mission.assessment.questions.length} answered</span><button className={styles.primaryAction} type="submit" disabled={!canSubmit || pending}>{pending ? "Scoring…" : "Submit Test"}</button></div></form>
      {assessmentState.message ? <div className={`${styles.resultCard} ${assessmentState.passed ? styles.passResult : styles.reviewResult}`}><strong>{assessmentState.passed ? "LEVEL COMPLETE" : "REVIEW & TRY AGAIN"}</strong><p>{assessmentState.message}</p></div> : null}
    </section> : null}
  </div>;
}
