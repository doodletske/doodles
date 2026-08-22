const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;
const API_BASE_URL =
  process.env.NODE_ENV === "production" &&
  (!configuredApiUrl || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredApiUrl))
    ? "https://doodlets-api.doodletske.workers.dev"
    : configuredApiUrl || "http://localhost:5000";

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(error.message || "Something went wrong.");
  }

  return response.json();
}
