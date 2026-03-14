type PublicEnvKey = "NEXT_PUBLIC_SITE_URL" | "NEXT_PUBLIC_API_BASE_URL" | "NEXT_PUBLIC_API_URL";

function readEnv(keys: PublicEnvKey[], fallback: string): string {
  for (const key of keys) {
    const value = process.env[key];

    if (value) {
      return value;
    }
  }

  return fallback;
}

export const env = {
  siteUrl: readEnv(["NEXT_PUBLIC_SITE_URL"], "http://localhost:3000"),
  apiBaseUrl: readEnv(["NEXT_PUBLIC_API_BASE_URL", "NEXT_PUBLIC_API_URL"], "http://localhost:4000")
};
