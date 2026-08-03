import { supabase } from "@/lib/supabase";

export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const {
    data: {
      session,
    },
  } = await supabase.auth.getSession();

  const token = session?.access_token;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...options.headers,
      },
    }
  );

  return res;
}