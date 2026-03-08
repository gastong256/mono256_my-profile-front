const requiredPublicKeys = ["NEXT_PUBLIC_SITE_URL", "NEXT_PUBLIC_API_URL"] as const;

type PublicEnvKey = (typeof requiredPublicKeys)[number];

function readEnv(key: PublicEnvKey, fallback: string): string {
  return process.env[key] || fallback;
}

export const env = {
  siteUrl: readEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
  apiUrl: readEnv("NEXT_PUBLIC_API_URL", "http://localhost:4000")
};
