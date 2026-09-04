"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { initialAssessmentActionState, submitAcademyAssessment } from "./actions";
import styles from "./academy-world.module.css";

export type AcademyQuestion = {
  id: string;
  position: number;
  text: string;
  type: string;
  options: unknown[];
};

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
  assessment: null | {
    id: string;
    title: string;
    instructions: string | null;
    passingScore: number;
    questions: AcademyQuestion[];
  };
};

type Zone = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  status: "current" | "open" | "locked";
  requirement?: string;
};

export function AcademyWorldClient({
  learnerName = "Learner",
  roleLabel = "Family Academy",
  mission,
}: {
  learnerName?: string;
  roleLabel?: string;
  mission: AcademyWorldMission;
}) {
  const router = useRouter();
  const [showMission, setShowMission] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [assessmentState, assessmentAction, pending] = useActionState(
    submitAcademyAssessment,
    initialAssessmentActionState,
  );

  useEffect(() => {
    if (assessmentState.status === "success") router.refresh();
  }, [assessmentState.status, assessmentState.score, router]);

  const zones = useMemo<Zone[]>(() => {
    const level = mission.levelNumber;
    return [
      { id: "scripture", title: "Scripture Hall", subtitle: "Biblical foundation, leadership, identity, law and understanding", icon: "📖", status: "current" },
      { id: "family", title: "Family Hall", subtitle: "Love, communication, responsibility and restoration", icon: "🏠", status: level >= 2 ? "open" : "locked", requirement: "Pass Level 1 with 70% or higher" },
      { id: "garden", title: "Garden Lab", subtitle: "Nature, stewardship, science and growing food", icon: "🌿", status: level >= 3 ? "open" : "locked", requirement: "Advance through the foundational pathway" },
      { id: "kitchen", title: "Kitchen Lab", subtitle: "Cooking, measurement, nutrition and service", icon: "🍲", status: level >= 4 ? "open" : "locked", requirement: "Advance through the foundational pathway" },
      { id: "creative", title: "Creative Studio", subtitle: "Art, sewing, braiding, music and making", icon: "🎨", status: level >= 5 ? "open" : "locked", requirement: "Advance through the foundational pathway" },
      { id: "technology", title: "Technology Lab", subtitle: "Digital skills, building and game creation", icon: "💻", status: level >= 6 ? "open" : "locked", requirement: "Role and age pathway requirement" },
    ];
  }, [mission.levelNumber]);

  const [selectedId, setSelectedId] = useState("scripture");
  const selected = zones.find((zone) => zone.id === selectedId) ?? zones[0];
  const unlockedCount = zones.filter((zone) => zone.status !== "locked").length;
  const answeredCount = Object.keys(answers).length;
  const canSubmit = Boolean(mission.assessment && answeredCount === mission.assessment.questions.length);

  return (
    <div className={styles.shell}>
      <header className={styles.hud}>
        <div>
          <span className={styles.eyebrow}>{roleLabel}</span>
          <h1>{learnerName}&apos;s Academy World</h1>
        </div>
        <div className={styles.progressCard}>
          <strong>Current Level</strong>
          <span>Level {mission.levelNumber} · {mission.levelName}</span>
          <small>{unlockedCount} areas available · {mission.attempts} test attempt{mission.attempts === 1 ? "" : "s"}</small>
          {mission.bestScore !== null ? <small>Best score: {mission.bestScore}%</small> : null}
        </div>
      </header>

      <section className={styles.world} aria-label="Hands Gifted Academy explorable world">
        <div className={styles.path} />
        <div className={styles.avatar} aria-label="learner character">
          <span>🧍</span>
          <small>{learnerName}</small>
        </div>

        {zones.map((zone, index) => {
          const positions = [styles.zoneOne, styles.zoneTwo, styles.zoneThree, styles.zoneFour, styles.zoneFive, styles.zoneSix];
          return (
            <button
              key={zone.id}
              className={`${styles.zone} ${positions[index]} ${zone.status === "locked" ? styles.locked : ""} ${selected.id === zone.id ? styles.selected : ""}`}
              onClick={() => {
                setSelectedId(zone.id);
                setShowMission(false);
                setShowTest(false);
              }}
              aria-pressed={selected.id === zone.id}
            >
              <span className={styles.zoneIcon}>{zone.status === "locked" ? "🔒" : zone.icon}</span>
              <strong>{zone.title}</strong>
              <small>{zone.status === "current" ? "CURRENT PATH" : zone.status === "open" ? "EXPLORE" : "LOCKED"}</small>
            </button>
          );
        })}
      </section>

      <section className={styles.missionPanel}>
        <div>
          <span className={styles.eyebrow}>{selected.status === "current" ? "Current unlocked lesson" : selected.status === "locked" ? "Locked area" : "Exploration area"}</span>
          <h2>{selected.icon} {selected.title}</h2>
          <p>{selected.subtitle}</p>
          {selected.status === "locked" ? (
            <p className={styles.lockNotice}><strong>Unlock requirement:</strong> {selected.requirement}</p>
          ) : selected.id === "scripture" ? (
            <>
              <p><strong>{mission.assignmentTitle}</strong></p>
              <p>{mission.assignmentInstructions ?? mission.levelDescription}</p>
              <p><strong>Level rule:</strong> Finish the learning activities and score 70% or higher on the level test to advance.</p>
              {!mission.authenticated ? <p className={styles.lockNotice}>Preview mode: sign in to save scores and unlock your personal pathway.</p> : null}
            </>
          ) : (
            <p>This area contains age- and role-appropriate missions that connect learning to real household life.</p>
          )}
        </div>

        {selected.status !== "locked" ? (
          <button className={styles.primaryAction} onClick={() => setShowMission((value) => !value)}>
            {showMission ? "Close Mission" : selected.id === "scripture" ? "Enter Scripture Hall" : "Explore Area"}
          </button>
        ) : null}
      </section>

      {showMission ? (
        <section className={styles.lessonCard}>
          <span className={styles.eyebrow}>My Academy · Level {mission.levelNumber}</span>
          <h2>{selected.id === "scripture" ? mission.levelName : `${selected.title} Mission`}</h2>
          {selected.id === "scripture" ? (
            <>
              <p>{mission.levelDescription}</p>
              <ol>
                <li>Read the mission instructions carefully.</li>
                <li>Open your KJV 1611 and Apocrypha when the lesson directs you to investigate Scripture.</li>
                <li>Use your study notebook to record questions, discoveries, and what the lesson means for your present role.</li>
                <li>If research is permitted in the lesson, compare what outside sources say with the assigned Scripture and keep the two clearly distinguished.</li>
                <li>When you are ready, take the Level Check. You need 70% or higher to unlock the next level.</li>
              </ol>
              <div className={styles.lessonActions}>
                <button type="button">Need a Hint</button>
                <button type="button">Open Study Notes</button>
                {mission.assessment?.questions.length ? (
                  <button type="button" onClick={() => setShowTest((value) => !value)}>
                    {showTest ? "Close Level Test" : "Take Level Test"}
                  </button>
                ) : (
                  <button type="button" disabled>Level Test Being Prepared</button>
                )}
              </div>
            </>
          ) : (
            <p>Exploration missions for this room will unlock progressively from the same Family Academy pathway.</p>
          )}
        </section>
      ) : null}

      {showMission && showTest && selected.id === "scripture" && mission.assessment ? (
        <section className={styles.lessonCard}>
          <span className={styles.eyebrow}>Level assessment · Passing score {mission.assessment.passingScore}%</span>
          <h2>{mission.assessment.title}</h2>
          {mission.assessment.instructions ? <p>{mission.assessment.instructions}</p> : null}
          <form action={assessmentAction}>
            <input type="hidden" name="assessment_id" value={mission.assessment.id} />
            <input type="hidden" name="answers_json" value={JSON.stringify(answers)} />
            <div className={styles.quizList}>
              {mission.assessment.questions.map((question) => (
                <fieldset key={question.id} className={styles.questionCard}>
                  <legend>{question.position}. {question.text}</legend>
                  {question.options.map((option, optionIndex) => {
                    const display = typeof option === "boolean" ? (option ? "True" : "False") : String(option);
                    const selectedAnswer = answers[String(question.position)];
                    const checked = JSON.stringify(selectedAnswer) === JSON.stringify(option);
                    return (
                      <label key={`${question.id}-${optionIndex}`} className={styles.answerOption}>
                        <input
                          type="radio"
                          name={`question-${question.position}`}
                          checked={checked}
                          onChange={() => setAnswers((current) => ({ ...current, [String(question.position)]: option }))}
                        />
                        <span>{display}</span>
                      </label>
                    );
                  })}
                </fieldset>
              ))}
            </div>
            <div className={styles.testFooter}>
              <span>{answeredCount}/{mission.assessment.questions.length} answered</span>
              <button className={styles.primaryAction} type="submit" disabled={!canSubmit || pending}>
                {pending ? "Scoring…" : "Submit Level Test"}
              </button>
            </div>
          </form>
          {assessmentState.message ? (
            <div className={`${styles.resultCard} ${assessmentState.passed ? styles.passResult : styles.reviewResult}`}>
              <strong>{assessmentState.passed ? "LEVEL PASSED" : "REVIEW & RETAKE"}</strong>
              <p>{assessmentState.message}</p>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
