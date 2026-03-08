export type HealthResponse = {
  status: "ok";
};

export type ApiClientOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};
