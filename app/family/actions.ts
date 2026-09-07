'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '../../lib/supabase/server';

export async function familySignIn(formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    redirect('/family?error=missing');
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    redirect('/family?error=signin');
  }

  const { data: member } = await supabase
    .from('household_members')
    .select('household_role')
    .eq('user_id', data.user.id)
    .eq('is_active', true)
    .maybeSingle();

  if (!member) {
    redirect('/family?error=access');
  }

  if (member.household_role === 'parent' || member.household_role === 'adult') {
    redirect('/command-center');
  }

  redirect('/family/dashboard');
}

export async function familySignOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/family');
}
