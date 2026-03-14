import { env } from "@/lib/env";
import type { ApiClientOptions, ApiErrorCode, ApiMethod } from "@/types/api";

export class ApiError extends Error {
  status: number;
  code: ApiErrorCode;
  details: unknown;

  constructor(
    message: string,
    status: number,
    code: ApiErrorCode,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

function normalizeApiPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function resolveCachePolicy(
  method: ApiMethod,
  cache?: RequestCache
): RequestCache {
  if (cache) {
    return cache;
  }

  return method === "GET" ? "force-cache" : "no-store";
}

function mapStatusToCode(status: number): ApiErrorCode {
  if (status === 400) {
    return "BAD_REQUEST";
  }

  if (status === 401) {
    return "UNAUTHORIZED";
  }

  if (status === 403) {
    return "FORBIDDEN";
  }

  if (status === 404) {
    return "NOT_FOUND";
  }

  if (status === 429) {
    return "RATE_LIMITED";
  }

  if (status === 503) {
    return "SERVICE_UNAVAILABLE";
  }

  return "UNKNOWN";
}

async function readErrorPayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const text = await response.text();
    return text || null;
  } catch {
    return null;
  }
}

function defaultErrorMessage(status: number): string {
  if (status === 400) {
    return "The request is invalid.";
  }

  if (status === 401) {
    return "Your session is no longer valid.";
  }

  if (status === 403) {
    return "You do not have access to this resource.";
  }

  if (status === 404) {
    return "The requested resource was not found.";
  }

  if (status === 429) {
    return "Too many requests. Please try again shortly.";
  }

  if (status === 503) {
    return "The service is temporarily unavailable.";
  }

  return "Something went wrong while communicating with the API.";
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again."
): string {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export async function apiClient<TResponse = unknown, TBody = unknown>(
  path: string,
  options: ApiClientOptions<TBody> = {}
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    headers = {},
    cache,
    revalidate,
    authToken,
    signal,
  } = options;
  const resolvedPath = normalizeApiPath(path);
  const isGetMethod = method === "GET";
  const resolvedCache = resolveCachePolicy(method, cache);

  const response = await fetch(`${env.apiBaseUrl}${resolvedPath}`, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: resolvedCache,
    ...(isGetMethod && revalidate !== undefined
      ? { next: { revalidate } }
      : {}),
    signal,
  });

  if (!response.ok) {
    const errorPayload = await readErrorPayload(response);
    throw new ApiError(
      defaultErrorMessage(response.status),
      response.status,
      mapStatusToCode(response.status),
      errorPayload
    );
  }

  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}
