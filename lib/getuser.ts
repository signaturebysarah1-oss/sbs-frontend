import { supabase } from "@/lib/supabase";

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) return null;

  return {
    id: session.user.id,
    name:
      session.user.user_metadata?.full_name ||
      session.user.user_metadata?.name ||
      "",
    email: session.user.email || "",
    avatar:
      session.user.user_metadata?.avatar_url ||
      session.user.user_metadata?.picture ||
      "",
  };
}