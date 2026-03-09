import { env } from "@/lib/env";
import type { ApiClientOptions } from "@/types/api";

export async function apiClient<T>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, cache, revalidate } = options;
  const isGet = method === "GET";
  const resolvedCache = cache ?? (isGet ? "force-cache" : "no-store");

  const response = await fetch(`${env.apiUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: resolvedCache,
    ...(isGet && revalidate !== undefined ? { next: { revalidate } } : {})
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}
