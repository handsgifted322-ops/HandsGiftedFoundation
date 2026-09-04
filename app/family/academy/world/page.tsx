import type { Metadata } from "next";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";
import { AcademyWorldClient } from "./AcademyWorldClient";

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

export default async function AcademyWorldPage({ searchParams }: { searchParams: Promise<{ child?: string }> }) {
  const params = await searchParams;
  const selectedSlug = String(params.child ?? "").toLowerCase();
  let learnerName = childNames[selectedSlug] ?? "Family Learner";
  let roleLabel = "Family Academy";

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();
    if (auth.user) {
      const { data: member } = await supabase
        .from("household_members")
        .select("display_name,household_role,age_group")
        .eq("user_id", auth.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (member) {
        learnerName = member.display_name;
        roleLabel = member.household_role === "parent"
          ? "Adult Family Academy Pathway"
          : `${String(member.age_group ?? "child").replaceAll("_", " ")} pathway`;
      }
    }
  } catch {
    // Prototype remains usable without exposing private records.
  }

  return <AcademyWorldClient learnerName={learnerName} roleLabel={roleLabel} />;
}
