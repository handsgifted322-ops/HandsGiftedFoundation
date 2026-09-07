import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// These are public Supabase client identifiers. Environment variables remain the
// preferred configuration, while the fallback keeps authenticated family access
// connected on Vercel deployments that have not inherited preview env settings.
const DEFAULT_SUPABASE_URL = "https://ocliixwpnesfgalrafpi.supabase.co";
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kfsjv8vSWVNWdODpyWv1-w_a1ZiaAqx";

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY;

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot always persist refreshed cookies. Server actions
          // can persist authentication cookies; middleware can own refresh later.
        }
      },
    },
  });
}
