function readRequiredPublicEnv(
  value: string | undefined,
  fallback: string,
  label: string,
  key: string
): string {
  const resolvedValue = value || fallback;

  if (
    process.env.NODE_ENV === "production" &&
    resolvedValue === fallback &&
    fallback.startsWith("http://localhost")
  ) {
    throw new Error(
      `Missing required public environment variable for ${label}. Set: ${key}.`
    );
  }

  return resolvedValue;
}

export function getPublicSiteUrl() {
  return readRequiredPublicEnv(
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
    "site URL",
    "NEXT_PUBLIC_SITE_URL"
  );
}

export function getPublicApiBaseUrl() {
  return readRequiredPublicEnv(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "http://localhost:4000",
    "API base URL",
    "NEXT_PUBLIC_API_BASE_URL"
  );
}
