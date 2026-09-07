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

type StudyTool = {
  id: string;
  icon: string;
  name: string;
  purpose: string;
};

const STUDY_TOOLS: StudyTool[] = [
  { id: "kjv", icon: "📖", name: "KJV 1611 Bible", purpose: "Your primary Scripture text for the Academy." },
  { id: "apocrypha", icon: "📜", name: "Apocrypha", purpose: "Keep it with your Bible for assigned readings and cross-reference work." },
  { id: "notebook", icon: "✒️", name: "Notebook & Pen", purpose: "Write what you find, questions you have, and what you learn." },
  { id: "concordance", icon: "🔎", name: "Strong's Concordance", purpose: "Use it when a mission asks you to investigate words or locate related passages." },
  { id: "dictionary", icon: "📚", name: "Bible Dictionary", purpose: "Use it for background and definitions when the mission permits study resources." },
];

const HINTS = [
  "Start with the tools you would physically place beside you before opening a lesson.",
  "One tool is for writing your own discoveries. Two are Scripture texts. Two help you investigate words and background.",
  "Collect every study tool below. The Level Test stays closed until the Study Tools Hunt is complete.",
];

export function AcademyWorldClient({ learnerName = "Learner", roleLabel = "Family Academy", mission }: { learnerName?: string; roleLabel?: string; mission: AcademyWorldMission }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("scripture");
  const [lockedId, setLockedId] = useState<string | null>(null);
  const [showMission, setShowMission] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [collectedTools, setCollectedTools] = useState<string[]>([]);
  const [hintIndex, setHintIndex] = useState<number | null>(null);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [assessmentState, assessmentAction, pending] = useActionState(submitAcademyAssessment, initialAssessmentActionState);

  useEffect(() => {
    if (assessmentState.status === "success") router.refresh();
  }, [assessmentState.status, assessmentState.score, router]);

  const zones = useMemo<Zone[]>(() => {
    const level = mission.levelNumber;
    return [
      { id: "scripture", title: "Scripture Hall", subtitle: "Word · Wisdom · Truth", status: "current", x: 17, y: 19 },
      { id: "family", title: "Family Hall", subtitle: "Relationships · Home · Life", status: level >= 2 ? "open" : "locked", x: 18, y: 34, requirement: "Complete your current Academy level to open Family Hall." },
      { id: "garden", title: "Garden Courtyard", subtitle: "Stewardship · Creation · Health", status: level >= 3 ? "open" : "locked", x: 24, y: 49, requirement: "Advance farther through your foundational pathway." },
      { id: "kitchen", title: "Kitchen Lab", subtitle: "Nourish · Create · Provide", status: level >= 4 ? "open" : "locked", x: 83, y: 20, requirement: "Advance farther through your foundational pathway." },
      { id: "creative", title: "Creative Studio", subtitle: "Imagine · Design · Express", status: level >= 5 ? "open" : "locked", x: 82, y: 36, requirement: "Advance farther through your foundational pathway." },
      { id: "technology", title: "Technology Lab", subtitle: "Innovate · Build · Solve", status: level >= 6 ? "open" : "locked", x: 79, y: 52, requirement: "Reach the required pathway stage for Technology Lab." },
    ];
  }, [mission.levelNumber]);

  const selected = zones.find((zone) => zone.id === selectedId) ?? zones[0];
  const locked = lockedId ? zones.find((zone) => zone.id === lockedId) ?? null : null;
  const answeredCount = Object.keys(answers).length;
  const canSubmit = Boolean(mission.assessment && answeredCount === mission.assessment.questions.length);
  const studyToolsComplete = collectedTools.length === STUDY_TOOLS.length;
  const activityRequired = mission.levelNumber === 1;
  const testUnlocked = !activityRequired || studyToolsComplete;

  const handleSelectZone = useCallback((zoneId: string) => {
    const zone = zones.find((candidate) => candidate.id === zoneId);
    if (!zone) return;
    setSelectedId(zoneId);
    setShowTest(false);
    setAnswers({});
    setHintIndex(null);

    if (zone.status === "locked") {
      setLockedId(zoneId);
      setShowMission(false);
      return;
    }

    setLockedId(null);
    setShowMission(true);
  }, [zones]);

  const closeRoom = () => {
    setShowMission(false);
    setShowTest(false);
    setAnswers({});
    setHintIndex(null);
  };

  const collectTool = (toolId: string) => {
    setCollectedTools((current) => current.includes(toolId) ? current : [...current, toolId]);
  };

  const nextHint = () => {
    setHintIndex((current) => current === null ? 0 : (current + 1) % HINTS.length);
  };

  return <div className={styles.shell}>
    <section className={styles.gameFrame} aria-label="Hands Gifted Kingdom Academy">
      <KingdomGameCanvas zones={zones} onSelectZone={handleSelectZone} />

      <div className={styles.kingdomGuide}>
        <span>♛ KINGDOM ACADEMY</span>
        <strong>Choose a destination to begin learning.</strong>
      </div>

      {locked ? <div className={styles.lockedToast} role="status">
        <button aria-label="Close locked message" onClick={() => setLockedId(null)}>×</button>
        <span>LOCKED DESTINATION</span>
        <strong>{locked.title}</strong>
        <small>{locked.requirement}</small>
      </div> : null}
    </section>

    <section className={styles.statusRail} aria-label="Current Academy status">
      <div><span>Learner</span><strong>{learnerName}</strong><small>{roleLabel}</small></div>
      <div><span>Current level</span><strong>{mission.levelNumber}. {mission.levelName}</strong><small>{mission.status}</small></div>
      <div className={styles.statusMission}><span>Current mission</span><strong>{mission.assignmentTitle}</strong><small>Begin in Scripture Hall</small></div>
    </section>

    {showMission && selected.status !== "locked" ? <div className={styles.roomBackdrop} role="dialog" aria-modal="true" aria-label={`${selected.title} learning room`}>
      <section className={styles.lessonOverlay}>
        <div className={styles.lessonTop}>
          <div>
            <span className={styles.eyebrow}>Hands Gifted Academy · {selected.title}</span>
            <h2>{selected.id === "scripture" ? mission.levelName : selected.title}</h2>
          </div>
          <button onClick={closeRoom}>Return to Kingdom</button>
        </div>

        {selected.id === "scripture" ? <>
          <div className={styles.roomBanner}>
            <span>WORD · WISDOM · TRUTH</span>
            <strong>{mission.assignmentTitle}</strong>
            <small>Level {mission.levelNumber} · {mission.bestScore !== null ? `Best score ${mission.bestScore}%` : "Not tested yet"} · {mission.attempts} attempt{mission.attempts === 1 ? "" : "s"}</small>
          </div>

          <div className={styles.missionPath} aria-label="Mission progress">
            <div className={studyToolsComplete || !activityRequired ? styles.pathDone : styles.pathCurrent}><span>1</span><strong>Explore</strong><small>{activityRequired ? "Study Tools Hunt" : "Lesson activity"}</small></div>
            <div className={testUnlocked ? styles.pathCurrent : styles.pathLocked}><span>2</span><strong>Study</strong><small>Read · find · understand</small></div>
            <div className={assessmentState.passed ? styles.pathDone : (testUnlocked ? styles.pathCurrent : styles.pathLocked)}><span>3</span><strong>Level Test</strong><small>{assessmentState.passed ? "Complete" : "Assessment"}</small></div>
          </div>

          <p className={styles.missionText}>{mission.levelDescription}</p>

          {activityRequired ? <section className={styles.activityBoard}>
            <div className={styles.activityHeading}>
              <div><span className={styles.eyebrow}>Interactive activity</span><h3>Study Tools Hunt</h3></div>
              <strong>{collectedTools.length}/{STUDY_TOOLS.length} collected</strong>
            </div>
            <p>Build your study station. Tap each tool to collect it and learn why it belongs in your Academy study setup.</p>
            <div className={styles.toolGrid}>
              {STUDY_TOOLS.map((tool) => {
                const collected = collectedTools.includes(tool.id);
                return <button key={tool.id} type="button" className={collected ? styles.toolCollected : styles.toolCard} onClick={() => collectTool(tool.id)}>
                  <span className={styles.toolIcon}>{tool.icon}</span>
                  <strong>{tool.name}</strong>
                  <small>{tool.purpose}</small>
                  <em>{collected ? "✓ Collected" : "Tap to collect"}</em>
                </button>;
              })}
            </div>
            {studyToolsComplete ? <div className={styles.activityComplete}>
              <span>♛ ACTIVITY COMPLETE</span>
              <strong>Your study station is ready.</strong>
              <p>Move into the study portion of the mission. The Level Test is now available when an assessment has been prepared.</p>
            </div> : null}
          </section> : null}

          <div className={styles.questBoard}>
            <h3>Your Mission</h3>
            <p>{mission.assignmentInstructions}</p>
            <ol>
              <li>Read the mission carefully before choosing an answer or opening a test.</li>
              <li>Open your KJV 1611 and Apocrypha when the mission calls for Scripture.</li>
              <li>Use your notebook to record discoveries, questions, and what the lesson means for your role.</li>
              <li>Use web research only when the mission permits it. Keep outside research separate from what Scripture itself says.</li>
              <li>When the activity and study work are complete, take the Level Test.</li>
            </ol>
          </div>

          <div className={styles.lessonActions}>
            <button type="button" onClick={nextHint}>{hintIndex === null ? "Need a Hint" : "Another Hint"}</button>
            <button type="button" onClick={() => setShowNotes((value) => !value)}>{showNotes ? "Close Notes" : "Study Notes"}</button>
            {mission.assessment?.questions.length ? <button type="button" disabled={!testUnlocked} onClick={() => testUnlocked && setShowTest((value) => !value)}>{!testUnlocked ? "Complete Activity to Unlock Test" : (showTest ? "Close Test" : "Take Level Test")}</button> : <button disabled>Test Being Prepared</button>}
          </div>

          {hintIndex !== null ? <div className={styles.hintCard}>
            <span>HINT {hintIndex + 1} OF {HINTS.length}</span>
            <p>{HINTS[hintIndex]}</p>
          </div> : null}

          {showNotes ? <div className={styles.notesPanel}>
            <div><strong>Study Notes</strong><small>Use this space while you work. These session notes are not yet saved to your Academy record.</small></div>
            <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Write what you discovered, a Scripture to revisit, or a question for Mom/Dad…" rows={6}/>
          </div> : null}

          {!mission.authenticated ? <p className={styles.previewNote}>Preview mode: sign in to save assessment progress and unlock your personal Kingdom pathway.</p> : null}
        </> : <div className={styles.questBoard}>
          <h3>{selected.title}</h3>
          <p>This Kingdom destination is connected to the same Family Academy pathway. Its role- and age-appropriate missions will appear here as its learning content is completed.</p>
        </div>}

        {showTest && selected.id === "scripture" && mission.assessment ? <section className={styles.testPanel}>
          <span className={styles.eyebrow}>Level assessment</span>
          <h3>{mission.assessment.title}</h3>
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
      </section>
    </div> : null}
  </div>;
}
