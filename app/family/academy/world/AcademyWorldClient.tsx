"use client";

import { useActionState, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { initialAssessmentActionState, submitAcademyAssessment } from "./actions";
import { KingdomGameCanvas, type KingdomGameZone } from "./KingdomGameCanvas";
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

type Zone = KingdomGameZone & { requirement?: string };

export function AcademyWorldClient({ learnerName = "Learner", roleLabel = "Family Academy", mission }: { learnerName?: string; roleLabel?: string; mission: AcademyWorldMission }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("scripture");
  const [nearbyId, setNearbyId] = useState<string | null>(null);
  const [showMission, setShowMission] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [assessmentState, assessmentAction, pending] = useActionState(submitAcademyAssessment, initialAssessmentActionState);

  useEffect(() => {
    if (assessmentState.status === "success") router.refresh();
  }, [assessmentState.status, assessmentState.score, router]);

  const zones = useMemo<Zone[]>(() => {
    const level = mission.levelNumber;
    return [
      { id: "scripture", title: "Scripture Hall", subtitle: "Word · Wisdom · Truth", status: "current", x: 13, y: 17 },
      { id: "family", title: "Family Hall", subtitle: "Relationships · Home · Life", status: level >= 2 ? "open" : "locked", x: 14, y: 34, requirement: "Complete the current Academy level" },
      { id: "garden", title: "Garden Courtyard", subtitle: "Stewardship · Creation · Health", status: level >= 3 ? "open" : "locked", x: 15, y: 53, requirement: "Advance through your pathway" },
      { id: "kitchen", title: "Kitchen Lab", subtitle: "Nourish · Create · Provide", status: level >= 4 ? "open" : "locked", x: 87, y: 17, requirement: "Advance through your pathway" },
      { id: "creative", title: "Creative Studio", subtitle: "Imagine · Design · Express", status: level >= 5 ? "open" : "locked", x: 86, y: 35, requirement: "Advance through your pathway" },
      { id: "technology", title: "Technology Lab", subtitle: "Innovate · Build · Solve", status: level >= 6 ? "open" : "locked", x: 86, y: 55, requirement: "Reach the required role and age stage" },
    ];
  }, [mission.levelNumber]);

  const selected = zones.find((zone) => zone.id === selectedId) ?? zones[0];
  const nearby = nearbyId ? zones.find((zone) => zone.id === nearbyId) ?? null : null;
  const answeredCount = Object.keys(answers).length;
  const canSubmit = Boolean(mission.assessment && answeredCount === mission.assessment.questions.length);

  const handleNearbyZone = useCallback((zoneId: string | null) => {
    setNearbyId(zoneId);
  }, []);

  const handleSelectZone = useCallback((zoneId: string) => {
    setSelectedId(zoneId);
    setShowMission(false);
    setShowTest(false);
  }, []);

  const enterNearby = () => {
    if (!nearby) return;
    setSelectedId(nearby.id);
    if (nearby.status !== "locked") {
      setShowMission(true);
      setShowTest(false);
    }
  };

  return <div className={styles.shell}>
    <section className={styles.gameFrame} aria-label="Hands Gifted Kingdom Academy">
      <KingdomGameCanvas
        learnerName={learnerName}
        zones={zones}
        onNearbyZone={handleNearbyZone}
        onSelectZone={handleSelectZone}
      />

      <div className={styles.profileHud}>
        <div className={styles.profileOrb}>♛</div>
        <div><strong>{learnerName}</strong><span>{roleLabel}</span><small>Level {mission.levelNumber} · {mission.levelName}</small></div>
      </div>

      <div className={styles.utilityHud}><span>Map</span><span>Rewards</span><span>Journal</span><span>Settings</span></div>

      <div className={styles.missionHud}>
        <span>♛ CURRENT MISSION</span>
        <strong>{mission.assignmentTitle}</strong>
        <small>{nearby ? (nearby.status === "locked" ? `${nearby.title} is locked` : `You reached ${nearby.title}`) : "Tap anywhere in the Kingdom to walk. Move toward a learning destination."}</small>
      </div>

      <div className={styles.gameHint}>Tap to walk · Arrow keys/WASD on desktop</div>

      {nearby ? <button className={styles.interactPrompt} onClick={enterNearby}>
        {nearby.status === "locked" ? `🔒 ${nearby.title}` : `Enter ${nearby.title}`}
      </button> : null}
    </section>

    {nearby?.status === "locked" ? <section className={styles.noticeCard}>
      <strong>{nearby.title} is still locked.</strong>
      <p>{nearby.requirement}</p>
    </section> : null}

    {showMission && selected.status !== "locked" ? <section className={styles.lessonOverlay}>
      <div className={styles.lessonTop}>
        <div><span className={styles.eyebrow}>You entered {selected.title}</span><h2>{selected.id === "scripture" ? mission.levelName : selected.title}</h2></div>
        <button onClick={() => { setShowMission(false); setShowTest(false); }}>Return to Kingdom</button>
      </div>

      {selected.id === "scripture" ? <>
        <p className={styles.missionText}>{mission.levelDescription}</p>
        <div className={styles.questBoard}>
          <h3>{mission.assignmentTitle}</h3>
          <p>{mission.assignmentInstructions}</p>
          <ol>
            <li>Read the mission carefully.</li>
            <li>Open your KJV 1611 and Apocrypha when the mission calls for Scripture.</li>
            <li>Use your study notebook to write discoveries, questions, and what the lesson means for your role.</li>
            <li>Use web research only when the mission permits it, and keep outside research separate from what the Scripture itself says.</li>
            <li>When you feel ready, take the Level Test.</li>
          </ol>
        </div>
        <div className={styles.lessonActions}>
          <button>Need a Hint</button>
          <button>Study Notes</button>
          {mission.assessment?.questions.length ? <button onClick={() => setShowTest((value) => !value)}>{showTest ? "Close Test" : "Take Level Test"}</button> : <button disabled>Test Being Prepared</button>}
        </div>
        {!mission.authenticated ? <p className={styles.previewNote}>Preview mode: sign in to save progress and unlock your personal Kingdom pathway.</p> : null}
      </> : <div className={styles.questBoard}>
        <h3>{selected.title}</h3>
        <p>This destination is now part of the playable Kingdom hub. Its role- and age-appropriate lessons will be connected to the same Family Academy pathway as each room is completed.</p>
      </div>}
    </section> : null}

    {showMission && showTest && selected.id === "scripture" && mission.assessment ? <section className={styles.lessonOverlay}>
      <span className={styles.eyebrow}>Level assessment</span>
      <h2>{mission.assessment.title}</h2>
      {mission.assessment.instructions ? <p>{mission.assessment.instructions}</p> : null}
      <form action={assessmentAction}>
        <input type="hidden" name="assessment_id" value={mission.assessment.id}/>
        <input type="hidden" name="answers_json" value={JSON.stringify(answers)}/>
        <div className={styles.quizList}>{mission.assessment.questions.map((question) => <fieldset key={question.id} className={styles.questionCard}>
          <legend>{question.position}. {question.text}</legend>
          {question.options.map((option, optionIndex) => {
            const display = typeof option === "boolean" ? (option ? "True" : "False") : String(option);
            const checked = JSON.stringify(answers[String(question.position)]) === JSON.stringify(option);
            return <label key={`${question.id}-${optionIndex}`} className={styles.answerOption}>
              <input type="radio" name={`question-${question.position}`} checked={checked} onChange={() => setAnswers((current) => ({ ...current, [String(question.position)]: option }))}/>
              <span>{display}</span>
            </label>;
          })}
        </fieldset>)}</div>
        <div className={styles.testFooter}>
          <span>{answeredCount}/{mission.assessment.questions.length} answered</span>
          <button className={styles.primaryAction} type="submit" disabled={!canSubmit || pending}>{pending ? "Scoring…" : "Submit Test"}</button>
        </div>
      </form>
      {assessmentState.message ? <div className={`${styles.resultCard} ${assessmentState.passed ? styles.passResult : styles.reviewResult}`}>
        <strong>{assessmentState.passed ? "LEVEL COMPLETE" : "REVIEW & TRY AGAIN"}</strong>
        <p>{assessmentState.message}</p>
      </div> : null}
    </section> : null}
  </div>;
}
