"use client";

import { useMemo, useState } from "react";
import styles from "./academy-world.module.css";

type Zone = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  status: "current" | "open" | "locked";
  requirement?: string;
};

const zones: Zone[] = [
  { id: "scripture", title: "Scripture Hall", subtitle: "Biblical leadership, identity, law and understanding", icon: "📖", status: "current" },
  { id: "family", title: "Family Hall", subtitle: "Love, communication, responsibility and restoration", icon: "🏠", status: "open" },
  { id: "garden", title: "Garden Lab", subtitle: "Nature, stewardship, science and growing food", icon: "🌿", status: "open" },
  { id: "kitchen", title: "Kitchen Lab", subtitle: "Cooking, measurement, nutrition and service", icon: "🍲", status: "locked", requirement: "Pass the current level with 70% or higher" },
  { id: "creative", title: "Creative Studio", subtitle: "Art, sewing, braiding, music and making", icon: "🎨", status: "locked", requirement: "Complete the next Academy checkpoint" },
  { id: "technology", title: "Technology Lab", subtitle: "Digital skills, building and game creation", icon: "💻", status: "locked", requirement: "Role and age pathway requirement" },
];

export function AcademyWorldClient({ learnerName = "Learner", roleLabel = "Family Academy" }: { learnerName?: string; roleLabel?: string }) {
  const [selected, setSelected] = useState<Zone>(zones[0]);
  const [showMission, setShowMission] = useState(false);

  const unlockedCount = useMemo(() => zones.filter((zone) => zone.status !== "locked").length, []);

  return (
    <div className={styles.shell}>
      <header className={styles.hud}>
        <div>
          <span className={styles.eyebrow}>{roleLabel}</span>
          <h1>{learnerName}&apos;s Academy World</h1>
        </div>
        <div className={styles.progressCard}>
          <strong>Current Level</strong>
          <span>Biblical Leadership · Level 1</span>
          <small>{unlockedCount} areas available</small>
        </div>
      </header>

      <section className={styles.world} aria-label="Hands Gifted Academy explorable world prototype">
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
                setSelected(zone);
                setShowMission(false);
              }}
              aria-pressed={selected.id === zone.id}
            >
              <span className={styles.zoneIcon}>{zone.status === "locked" ? "🔒" : zone.icon}</span>
              <strong>{zone.title}</strong>
              <small>{zone.status === "current" ? "CURRENT MISSION" : zone.status === "open" ? "EXPLORE" : "LOCKED"}</small>
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
              <p><strong>Mission:</strong> Discover what made Moses a biblical leader. Open your KJV 1611, locate the assigned passages, identify the orders he received, and record what happened when those orders were followed.</p>
              <p><strong>Level rule:</strong> Complete the activities, then pass the level test with a score of 70% or higher to unlock the next level.</p>
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
          <span className={styles.eyebrow}>Prototype mission interface</span>
          <h2>{selected.id === "scripture" ? "The Moses Mission" : `${selected.title} Mission`}</h2>
          {selected.id === "scripture" ? (
            <ol>
              <li>Open your KJV 1611 Bible and read the assigned Moses passage.</li>
              <li>Identify who gave the order, what Moses was commanded to do, and his response.</li>
              <li>Find one additional passage that shows Moses carrying responsibility.</li>
              <li>Write one way the lesson applies to your current role in the household.</li>
              <li>When the activities are complete, take the level test. Passing score: 70%.</li>
            </ol>
          ) : (
            <p>The finished version will load the learner&apos;s current unlocked mission from Supabase instead of this prototype content.</p>
          )}
          <div className={styles.lessonActions}>
            <button>Need a Hint</button>
            <button>Open Study Notes</button>
            <button>Ready for Review</button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
