import { authFetch } from "../query/authfetch";

export const postData = async <T>(
  endpoint: string,
  payload: T
) => {
  const response = await authFetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Request failed");
  }

  return response.json();
};