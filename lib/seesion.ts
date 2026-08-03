import { supabase } from "./supabase";

export const getCurrentSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
};