"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
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
  const [avatar, setAvatar] = useState({ x: 50, y: 83 });
  const [selectedId, setSelectedId] = useState("scripture");
  const [showMission, setShowMission] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [assessmentState, assessmentAction, pending] = useActionState(submitAcademyAssessment, initialAssessmentActionState);
  useEffect(() => { if (assessmentState.status === "success") router.refresh(); }, [assessmentState.status, assessmentState.score, router]);

  const zones = useMemo<Zone[]>(() => {
    const level = mission.levelNumber;
    return [
      { id: "scripture", title: "Scripture Hall", subtitle: "Bible study, leaders, law and understanding", icon: "📖", status: "current", x: 50, y: 22 },
      { id: "family", title: "Family Hall", subtitle: "Love, communication, bonding and restoration", icon: "🏠", status: level >= 2 ? "open" : "locked", x: 18, y: 39, requirement: "Complete the current Academy level" },
      { id: "garden", title: "Garden Hallway", subtitle: "Nature, science, stewardship and growing food", icon: "🌿", status: level >= 3 ? "open" : "locked", x: 82, y: 39, requirement: "Advance through your pathway" },
      { id: "kitchen", title: "Kitchen Hall", subtitle: "Cooking, measurement, nutrition and service", icon: "🍲", status: level >= 4 ? "open" : "locked", x: 15, y: 68, requirement: "Advance through your pathway" },
      { id: "creative", title: "Creative Hall", subtitle: "Art, sewing, braiding, music and making", icon: "🎨", status: level >= 5 ? "open" : "locked", x: 85, y: 68, requirement: "Advance through your pathway" },
      { id: "technology", title: "Technology Hall", subtitle: "Digital skills, building and game creation", icon: "💻", status: level >= 6 ? "open" : "locked", x: 50, y: 66, requirement: "Reach the required role and age stage" },
    ];
  }, [mission.levelNumber]);

  const selected = zones.find((zone) => zone.id === selectedId) ?? zones[0];
  const nearest = zones.reduce((best, zone) => { const distance = Math.hypot(zone.x - avatar.x, zone.y - avatar.y); return distance < best.distance ? { zone, distance } : best; }, { zone: zones[0], distance: Number.POSITIVE_INFINITY });
  const canInteract = nearest.distance < 13;
  const unlockedCount = zones.filter((zone) => zone.status !== "locked").length;
  const answeredCount = Object.keys(answers).length;
  const canSubmit = Boolean(mission.assessment && answeredCount === mission.assessment.questions.length);
  const move = (dx: number, dy: number) => { setAvatar((current) => ({ x: clamp(current.x + dx, 7, 93), y: clamp(current.y + dy, 16, 91) })); setShowMission(false); setShowTest(false); };
  const interact = () => { if (!canInteract) return; setSelectedId(nearest.zone.id); if (nearest.zone.status !== "locked") setShowMission(true); };

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
    <header className={styles.hud}><div><span className={styles.eyebrow}>{roleLabel}</span><h1>{learnerName}&apos;s Academy House</h1></div><div className={styles.progressCard}><strong>Level {mission.levelNumber}</strong><span>{mission.levelName}</span><small>{unlockedCount} hallways available</small>{mission.bestScore !== null ? <small>Best score: {mission.bestScore}%</small> : null}</div></header>

    <section className={styles.gameFrame} aria-label="Hands Gifted Academy House">
      <div className={styles.ceilingGlow}/><div className={styles.backWall}><div className={styles.banner}>HANDS GIFTED FAMILY ACADEMY</div></div><div className={styles.leftWall}/><div className={styles.rightWall}/><div className={styles.floorGrid}/>
      <div className={styles.centralFoyer}><span>THE SEVEN PILLARS</span></div>
      <div className={styles.glassPillars} aria-hidden="true">{Array.from({ length: 7 }).map((_, index) => <div className={styles.glassPillar} key={index}><i/><b>{index + 1}</b></div>)}</div>
      <div className={`${styles.hallway} ${styles.hallwayLeftTop}`}><span>Family Wing</span></div>
      <div className={`${styles.hallway} ${styles.hallwayRightTop}`}><span>Garden Wing</span></div>
      <div className={`${styles.hallway} ${styles.hallwayLeftBottom}`}><span>Kitchen Wing</span></div>
      <div className={`${styles.hallway} ${styles.hallwayRightBottom}`}><span>Creative Wing</span></div>
      <div className={`${styles.hallway} ${styles.hallwayCenter}`}><span>Technology Wing</span></div>
      <div className={styles.houseDetails}><div className={styles.sofa}>▰</div><div className={styles.plant}>🌿</div><div className={styles.lamp}>◉</div><div className={styles.window}>✦</div></div>

      {zones.map((zone) => <button key={zone.id} className={`${styles.portal} ${zone.status === "locked" ? styles.portalLocked : ""} ${nearest.zone.id === zone.id && canInteract ? styles.portalNear : ""}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} onClick={() => { setAvatar({ x: zone.x, y: clamp(zone.y + 9, 16, 91) }); setSelectedId(zone.id); setShowMission(false); setShowTest(false); }} aria-label={`${zone.title} ${zone.status}`}><span className={styles.portalDoor}>{zone.status === "locked" ? "🔒" : zone.icon}</span><strong>{zone.title}</strong><small>{zone.status === "current" ? "CURRENT" : zone.status === "open" ? "OPEN" : "LOCKED"}</small></button>)}

      <div className={styles.avatar} style={{ left: `${avatar.x}%`, top: `${avatar.y}%` }} aria-label={`${learnerName} avatar`}><div className={styles.avatarHead}>●</div><div className={styles.avatarBody}>▲</div><small>{learnerName}</small></div>
      <div className={styles.gameHudLeft}><span>CURRENT MISSION</span><strong>{mission.assignmentTitle}</strong></div><div className={styles.gameHudRight}><span>HOUSE CONTROLS</span><strong>Walk the hallways · E to enter</strong></div>
      {canInteract ? <button className={styles.interactPrompt} onClick={interact}>{nearest.zone.status === "locked" ? `🔒 ${nearest.zone.title}` : `E · Enter ${nearest.zone.title}`}</button> : <div className={styles.interactPromptMuted}>Explore the house and follow a hallway</div>}
      <div className={styles.mobilePad} aria-label="movement controls"><button onClick={() => move(0, -4)}>▲</button><div><button onClick={() => move(-4, 0)}>◀</button><button onClick={interact}>●</button><button onClick={() => move(4, 0)}>▶</button></div><button onClick={() => move(0, 4)}>▼</button></div>
    </section>

    {selected.status === "locked" && canInteract && nearest.zone.id === selected.id ? <section className={styles.noticeCard}><strong>{selected.title} is still locked.</strong><p>{selected.requirement}</p></section> : null}
    {showMission && selected.status !== "locked" ? <section className={styles.lessonOverlay}><div className={styles.lessonTop}><div><span className={styles.eyebrow}>You entered {selected.title}</span><h2>{selected.id === "scripture" ? mission.levelName : selected.title}</h2></div><button onClick={() => { setShowMission(false); setShowTest(false); }}>Return to House</button></div>{selected.id === "scripture" ? <><p className={styles.missionText}>{mission.levelDescription}</p><div className={styles.questBoard}><h3>{mission.assignmentTitle}</h3><p>{mission.assignmentInstructions}</p><ol><li>Read the mission carefully.</li><li>Open your KJV 1611 and Apocrypha when the mission calls for Scripture.</li><li>Use your study notebook to write discoveries, questions, and what the lesson means for your role.</li><li>Use web research only when the mission permits it, and keep outside research separate from what the Scripture itself says.</li><li>When you feel ready, take the Level Test.</li></ol></div><div className={styles.lessonActions}><button>Need a Hint</button><button>Study Notes</button>{mission.assessment?.questions.length ? <button onClick={() => setShowTest((value) => !value)}>{showTest ? "Close Test" : "Take Level Test"}</button> : <button disabled>Test Being Prepared</button>}</div>{!mission.authenticated ? <p className={styles.previewNote}>Preview mode: sign in to save progress and unlock your personal pathway.</p> : null}</> : <p>This hallway will load role- and age-appropriate missions from the same Family Academy pathway.</p>}</section> : null}
    {showMission && showTest && selected.id === "scripture" && mission.assessment ? <section className={styles.lessonOverlay}><span className={styles.eyebrow}>Level assessment</span><h2>{mission.assessment.title}</h2>{mission.assessment.instructions ? <p>{mission.assessment.instructions}</p> : null}<form action={assessmentAction}><input type="hidden" name="assessment_id" value={mission.assessment.id}/><input type="hidden" name="answers_json" value={JSON.stringify(answers)}/><div className={styles.quizList}>{mission.assessment.questions.map((question) => <fieldset key={question.id} className={styles.questionCard}><legend>{question.position}. {question.text}</legend>{question.options.map((option, optionIndex) => { const display = typeof option === "boolean" ? (option ? "True" : "False") : String(option); const checked = JSON.stringify(answers[String(question.position)]) === JSON.stringify(option); return <label key={`${question.id}-${optionIndex}`} className={styles.answerOption}><input type="radio" name={`question-${question.position}`} checked={checked} onChange={() => setAnswers((current) => ({ ...current, [String(question.position)]: option }))}/><span>{display}</span></label>; })}</fieldset>)}</div><div className={styles.testFooter}><span>{answeredCount}/{mission.assessment.questions.length} answered</span><button className={styles.primaryAction} type="submit" disabled={!canSubmit || pending}>{pending ? "Scoring…" : "Submit Test"}</button></div></form>{assessmentState.message ? <div className={`${styles.resultCard} ${assessmentState.passed ? styles.passResult : styles.reviewResult}`}><strong>{assessmentState.passed ? "LEVEL COMPLETE" : "REVIEW & TRY AGAIN"}</strong><p>{assessmentState.message}</p></div> : null}</section> : null}
  </div>;
}
