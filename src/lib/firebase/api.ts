import { auth } from "@/lib/firebase/firebase";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  let normalizedBase = API_BASE_URL.replace(/\/+$/, "");

  // Every frontend endpoint is already written as /api/.... Allow the
  // environment value to be either the host or the host followed by /api
  // without accidentally requesting /api/api/....
  if (normalizedPath.startsWith("/api/") && normalizedBase.endsWith("/api")) {
    normalizedBase = normalizedBase.slice(0, -4);
  }

  return `${normalizedBase}${normalizedPath}`;
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  let token: string | undefined;

  await auth.authStateReady();

  if (auth.currentUser) {
    token = await auth.currentUser.getIdToken();
  }

  const response = await fetch(buildApiUrl(path), {
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
