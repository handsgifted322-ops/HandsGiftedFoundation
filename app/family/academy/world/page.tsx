import type { Metadata } from "next";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";
import { AcademyWorldClient, type AcademyWorldMission } from "./AcademyWorldClient";

export const metadata: Metadata = {
  title: "Academy World | Hands Gifted Family Academy",
  robots: { index: false, follow: false },
};

const childNames: Record<string, string> = {
  isayah: "Isayah",
  caleb: "Caleb",
  amiyah: "Amiyah",
  kaliyah: "Kaliyah",
  ayahnna: "Ayahnna",
};

const previewMission: AcademyWorldMission = {
  authenticated: false,
  levelNumber: 1,
  levelName: "Study Tools & How to Study",
  levelDescription: "Learn how to investigate Scripture using the family study tools before deeper pathway levels unlock.",
  status: "preview",
  bestScore: null,
  attempts: 0,
  assignmentTitle: "Set Up Your Study Tools",
  assignmentInstructions: "Open your KJV 1611 and Apocrypha, prepare a study notebook, and practice finding and recording what you learn.",
  assessment: null,
};

export default async function AcademyWorldPage({ searchParams }: { searchParams: Promise<{ child?: string }> }) {
  const params = await searchParams;
  const selectedSlug = String(params.child ?? "").toLowerCase();
  let learnerName = childNames[selectedSlug] ?? "Family Learner";
  let roleLabel = "Family Academy";
  let mission = previewMission;

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();

    if (auth.user) {
      const { data: member } = await supabase
        .from("household_members")
        .select("id,display_name,household_role,age_group,organization_id")
        .eq("user_id", auth.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (member) {
        learnerName = member.display_name;
        roleLabel = member.household_role === "parent"
          ? "Adult Family Academy Pathway"
          : `${String(member.age_group ?? "child").replaceAll("_", " ")} pathway`;

        const { data: track } = await supabase
          .from("academy_tracks")
          .select("id")
          .eq("organization_id", member.organization_id)
          .eq("slug", "welcome-home-family-pathway")
          .eq("active", true)
          .maybeSingle();

        if (track) {
          const [{ data: levels }, { data: progress }, { data: assignments }] = await Promise.all([
            supabase
              .from("academy_levels")
              .select("id,level_number,name,description")
              .eq("track_id", track.id)
              .eq("active", true)
              .order("level_number", { ascending: true }),
            supabase
              .from("academy_progress")
              .select("level_id,status,best_score,attempts")
              .eq("household_member_id", member.id)
              .eq("track_id", track.id),
            supabase
              .from("academy_assignments")
              .select("title,instructions,status,priority,created_at")
              .eq("household_member_id", member.id)
              .eq("track_id", track.id)
              .neq("status", "completed")
              .order("priority", { ascending: true })
              .order("created_at", { ascending: true })
              .limit(1),
          ]);

          const progressByLevel = new Map((progress ?? []).map((row) => [row.level_id, row]));
          const currentLevel = (levels ?? []).find((level) => {
            const state = progressByLevel.get(level.id)?.status;
            return ["available", "learning", "ready_for_test", "needs_review"].includes(String(state));
          });

          if (currentLevel) {
            const currentProgress = progressByLevel.get(currentLevel.id);
            const { data: assessment } = await supabase
              .from("academy_assessments")
              .select("id,title,instructions,passing_score")
              .eq("level_id", currentLevel.id)
              .eq("active", true)
              .maybeSingle();

            let assessmentData: AcademyWorldMission["assessment"] = null;
            if (assessment) {
              const { data: questions } = await supabase
                .from("academy_questions")
                .select("id,position,question_text,question_type,options")
                .eq("assessment_id", assessment.id)
                .order("position", { ascending: true });

              assessmentData = {
                id: assessment.id,
                title: assessment.title,
                instructions: assessment.instructions,
                passingScore: assessment.passing_score,
                questions: (questions ?? []).map((question) => ({
                  id: question.id,
                  position: question.position,
                  text: question.question_text,
                  type: question.question_type,
                  options: Array.isArray(question.options) ? question.options : [],
                })),
              };
            }

            mission = {
              authenticated: true,
              levelNumber: currentLevel.level_number,
              levelName: currentLevel.name,
              levelDescription: currentLevel.description,
              status: String(currentProgress?.status ?? "available"),
              bestScore: currentProgress?.best_score ?? null,
              attempts: currentProgress?.attempts ?? 0,
              assignmentTitle: assignments?.[0]?.title ?? currentLevel.name,
              assignmentInstructions: assignments?.[0]?.instructions ?? currentLevel.description,
              assessment: assessmentData,
            };
          } else if ((levels ?? []).length > 0 && (progress ?? []).every((row) => row.status === "passed")) {
            mission = {
              authenticated: true,
              levelNumber: (levels ?? []).length,
              levelName: "Foundational Pathway Complete",
              levelDescription: "All currently configured foundational levels are passed.",
              status: "passed",
              bestScore: null,
              attempts: 0,
              assignmentTitle: "Pathway Complete",
              assignmentInstructions: "Return to the Family Academy for the next parent-released pathway.",
              assessment: null,
            };
          }
        }
      }
    }
  } catch {
    // Safe preview remains available without exposing private family records.
  }

  return <AcademyWorldClient learnerName={learnerName} roleLabel={roleLabel} mission={mission} />;
}
