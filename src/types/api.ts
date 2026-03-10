export type HealthResponse = {
  status: "ok";
};

export type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiClientOptions = {
  method?: ApiMethod;
  body?: unknown;
  headers?: Record<string, string>;
  cache?: RequestCache;
  revalidate?: number | false;
};
