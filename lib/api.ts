import { supabase } from "@/lib/supabase";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


export const authFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  const {
    data: { session },
  } = await supabase.auth.getSession();


  const token = session?.access_token;


  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...options.headers,
    },
  });
};