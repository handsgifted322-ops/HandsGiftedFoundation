import type { Metadata } from "next";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { familySignIn, familySignOut } from "./actions";

export const metadata: Metadata = {
  title: "Family Sign In | Hands Gifted",
  robots: { index: false, follow: false },
};

type Member = {
  display_name: string;
  household_role: string;
};

export default async function FamilyPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  let state: "config" | "signed_out" | "ready" | "unlinked" = "signed_out";
  let member: Member | null = null;

  try {
    const supabase = await createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();

    if (auth.user) {
      const { data } = await supabase
        .from("household_members")
        .select("display_name,household_role")
        .eq("user_id", auth.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (data) {
        member = data as Member;
        state = "ready";
      } else {
        state = "unlinked";
      }
    }
  } catch {
    state = "config";
  }

  const errorMessage =
    params.error === "missing"
      ? "Enter both your email and password."
      : params.error === "signin"
        ? "The email or password was not accepted."
        : params.error === "access"
          ? "This account is signed in but has not been linked to an approved family profile yet."
          : "";

  const isParent = member?.household_role === "parent" || member?.household_role === "adult";

  return (
    <main>
      <SiteHeader />
      <section className="secure-hero family-access">
        <div>
          <span>PRIVATE FAMILY ACCESS</span>
          <h1>Family Sign In</h1>
          <p>Family names, assignments, school support, household records, and individual progress stay behind authenticated access.</p>
          <div className="secure-badge">Public visitors cannot browse household members or open a child workspace by choosing a name.</div>
        </div>

        <div className="secure-card">
          {state === "config" ? (
            <>
              <strong>Private access is temporarily unavailable.</strong>
              <p>The public Foundation website is available, but the private Supabase runtime is not configured for this deployment.</p>
            </>
          ) : state === "signed_out" ? (
            <>
              <strong>Sign in to continue</strong>
              <p>Use an approved Hands Gifted family account.</p>
              {errorMessage ? <p role="alert"><strong>{errorMessage}</strong></p> : null}
              <form action={familySignIn} style={{ display: "grid", gap: 12, marginTop: 18 }}>
                <label>
                  Email
                  <input name="email" type="email" autoComplete="email" required style={{ width: "100%", marginTop: 6 }} />
                </label>
                <label>
                  Password
                  <input name="password" type="password" autoComplete="current-password" required style={{ width: "100%", marginTop: 6 }} />
                </label>
                <button className="button gold" type="submit">Sign In</button>
              </form>
            </>
          ) : state === "unlinked" ? (
            <>
              <strong>Account approval is still required.</strong>
              <p>This signed-in account is not linked to an active household member, so no family records are shown.</p>
              <form action={familySignOut}><button className="button" type="submit">Sign Out</button></form>
            </>
          ) : (
            <>
              <strong>Welcome, {member?.display_name}.</strong>
              <p>Your identity is being shown only after authenticated access.</p>
              <a className="button gold" href={isParent ? "/command-center" : "/family/dashboard"}>
                {isParent ? "Open Parent Command Center" : "Open My Dashboard"}
              </a>
              <form action={familySignOut} style={{ marginTop: 12 }}><button className="button" type="submit">Sign Out</button></form>
            </>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
