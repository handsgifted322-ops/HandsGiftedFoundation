"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";

export type AssessmentActionState = {
  status: "idle" | "success" | "error";
  message: string;
  score: number | null;
  passed: boolean | null;
  nextLevelUnlocked: boolean;
};

export const initialAssessmentActionState: AssessmentActionState = {
  status: "idle",
  message: "",
  score: null,
  passed: null,
  nextLevelUnlocked: false,
};

export async function submitAcademyAssessment(
  _previousState: AssessmentActionState,
  formData: FormData,
): Promise<AssessmentActionState> {
  const assessmentId = String(formData.get("assessment_id") ?? "");
  const rawAnswers = String(formData.get("answers_json") ?? "{}");

  if (!assessmentId) {
    return { ...initialAssessmentActionState, status: "error", message: "Assessment is unavailable." };
  }

  let answers: Record<string, unknown>;
  try {
    answers = JSON.parse(rawAnswers) as Record<string, unknown>;
  } catch {
    return { ...initialAssessmentActionState, status: "error", message: "Your answers could not be read. Try again." };
  }

  const supabase = await createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return { ...initialAssessmentActionState, status: "error", message: "Sign in to submit an Academy test." };
  }

  const { data, error } = await supabase.rpc("submit_my_academy_assessment", {
    p_assessment_id: assessmentId,
    p_answers: answers,
  });

  if (error) {
    return { ...initialAssessmentActionState, status: "error", message: error.message };
  }

  const result = Array.isArray(data) ? data[0] : data;
  const score = Number(result?.score ?? 0);
  const passed = Boolean(result?.passed);
  const nextLevelUnlocked = Boolean(result?.next_level_unlocked);

  revalidatePath("/family/academy/world");
  revalidatePath("/family/dashboard");
  revalidatePath("/command-center/academy");

  return {
    status: "success",
    message: passed
      ? nextLevelUnlocked
        ? `You scored ${score}%. You passed and unlocked the next level.`
        : `You scored ${score}%. You passed this level.`
      : `You scored ${score}%. Review this level and retake the test. You need 70% or higher to advance.`,
    score,
    passed,
    nextLevelUnlocked,
  };
}
