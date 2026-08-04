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


export const authFetchs = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {

  const {
    data: { session },
  } = await supabase.auth.getSession();


  const token = session?.access_token;


  const response = await fetch(`${API_URL}${endpoint}`, {
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


  if (!response.ok) {
    throw new Error("Request failed");
  }


  return response.json();
};