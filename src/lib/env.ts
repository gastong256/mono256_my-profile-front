type PublicEnvKey =
  | "NEXT_PUBLIC_SITE_URL"
  | "NEXT_PUBLIC_API_BASE_URL"
  | "NEXT_PUBLIC_API_URL";

function readEnv(keys: PublicEnvKey[], fallback: string): string {
  for (const key of keys) {
    const value = process.env[key];

    if (value) {
      return value;
    }
  }

  return fallback;
}

function readRequiredPublicEnv(
  keys: PublicEnvKey[],
  fallback: string,
  label: string
): string {
  const value = readEnv(keys, fallback);

  if (
    process.env.NODE_ENV === "production" &&
    value === fallback &&
    fallback.startsWith("http://localhost")
  ) {
    throw new Error(
      `Missing required public environment variable for ${label}. Set one of: ${keys.join(
        ", "
      )}.`
    );
  }

  return value;
}

export const env = {
  get siteUrl() {
    return readRequiredPublicEnv(
      ["NEXT_PUBLIC_SITE_URL"],
      "http://localhost:3000",
      "site URL"
    );
  },
  get apiBaseUrl() {
    return readRequiredPublicEnv(
      ["NEXT_PUBLIC_API_BASE_URL", "NEXT_PUBLIC_API_URL"],
      "http://localhost:4000",
      "API base URL"
    );
  },
};
