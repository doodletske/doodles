import { auth } from "@/lib/firebase/firebase";

const CLOUDFLARE_API_URL = "https://doodlets-api.doodletske.workers.dev";
const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;

// NEXT_PUBLIC_* values are frozen into the browser bundle during `next build`.
// A local .env.local file is useful for development, but it must never make a
// production build call localhost from a customer's browser.
const API_BASE_URL =
  process.env.NODE_ENV === "production" &&
  (!configuredApiUrl || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredApiUrl))
    ? CLOUDFLARE_API_URL
    : configuredApiUrl || "http://localhost:5000";

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
