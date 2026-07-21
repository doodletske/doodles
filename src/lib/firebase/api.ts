import { auth } from "@/lib/firebase/firebase";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let token: string | undefined;

  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken();
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(error.message || "Something went wrong.");
  }

  return response.json();
}