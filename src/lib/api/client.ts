import { env } from "@/lib/env";
import type { ApiClientOptions, ApiMethod } from "@/types/api";

function normalizeApiPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function resolveCachePolicy(method: ApiMethod, cache?: RequestCache): RequestCache {
  if (cache) {
    return cache;
  }

  return method === "GET" ? "force-cache" : "no-store";
}

export async function apiClient<T = unknown>(path: string, options: ApiClientOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, cache, revalidate } = options;
  const resolvedPath = normalizeApiPath(path);
  const isGetMethod = method === "GET";
  const resolvedCache = resolveCachePolicy(method, cache);

  const response = await fetch(`${env.apiUrl}${resolvedPath}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: resolvedCache,
    ...(isGetMethod && revalidate !== undefined ? { next: { revalidate } } : {})
  });

  if (!response.ok) {
    throw new Error(`API request failed (${method} ${resolvedPath}) with status ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
