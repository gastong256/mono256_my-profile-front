import Image from "next/image";

import { profileContent } from "@/content/profile";
import { WindowFrame } from "@/components/ui/window-frame";

import { PageContainer } from "@/components/layout/page-container";

export function AboutPage() {
  const { aboutDocument } = profileContent;

  const documentLines = [
    `# ${aboutDocument.title}`,
    "",
    "## Profile",
    profileContent.fullName,
    aboutDocument.profileRole,
    profileContent.location.replace(" - ", " · "),
    "",
    "## About",
    ...aboutDocument.intro,
    "",
    `## ${aboutDocument.experienceSnapshot.title}`,
    aboutDocument.experienceSnapshot.lead,
    aboutDocument.experienceSnapshot.detail,
    "",
    "## How I work",
    ...aboutDocument.focusAreas.map((area) => `- ${area}`),
    "",
    "## What I'm looking for",
    ...aboutDocument.principles,
    "",
    "EOF"
  ];

  const wordCount = documentLines
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const lineCount = documentLines.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <PageContainer className="flex h-full min-h-0 flex-col py-1 md:py-2">
      <WindowFrame
        title="Profile.md"
        size="fixed"
        className="w-full"
        bodyClassName="!p-0 md:!p-0 flex min-h-0 flex-1 flex-col !overflow-hidden"
        status="read-only"
        help={{
          section: "About",
          path: "~/Profile.md",
          items: [
            "Review profile summary and engineering highlights.",
            "Understand core strengths and delivery style."
          ]
        }}
      >
        <div className="border-b border-border/70 bg-background/30 px-4 py-2 md:px-6">
          <div className="grid grid-cols-1 items-center gap-1 md:grid-cols-[1fr_auto_1fr] md:gap-4">
            <p className="whitespace-nowrap font-mono text-[11px] text-foreground/70 md:text-xs">
              {lineCount} lines · {wordCount} words
              <span className="mx-2 text-foreground/40">•</span>
              ~{readingTimeMinutes} min read
            </p>

            <p className="hidden whitespace-nowrap text-center font-mono text-[11px] text-foreground/65 md:block md:text-xs">
              Last updated: {aboutDocument.lastUpdated}
            </p>

            <p className="hidden whitespace-nowrap text-right font-mono text-[11px] text-foreground/65 md:block md:text-xs">
              {aboutDocument.language}
            </p>
          </div>
        </div>

        <article className="min-h-0 flex-1 overflow-y-auto p-4 md:p-6">
          <div className="font-mono text-[13px] leading-6 text-[#A9B4C0] md:text-sm md:leading-7">
            <p className="font-sans text-[17px] font-bold leading-7 text-[#E6EDF3] md:text-[22px] md:leading-8">
              <span className="mr-1 font-mono font-semibold text-[#88C0D0]">#</span>
              {aboutDocument.title}
            </p>

            <p className="mt-5 font-semibold text-[#88C0D0]">## Profile</p>
            <div className="mt-1.5 grid grid-cols-[76px_minmax(0,1fr)] items-center gap-3 md:grid-cols-[84px_minmax(0,1fr)] md:gap-4">
              <div className="overflow-hidden rounded-md border border-white/15 bg-background/40 shadow-[0_8px_20px_rgba(0,0,0,0.25)]">
                <Image
                  src="/images/profile/profile.png"
                  alt="Gastón Germán Gonzalez profile photo"
                  width={168}
                  height={224}
                  className="h-[92px] w-full object-cover md:h-[100px]"
                  priority
                />
              </div>
              <div>
                <p className="font-medium text-[#E6EDF3]">{profileContent.fullName}</p>
                <p className="mt-0.5 font-medium text-[#E6EDF3]">{aboutDocument.profileRole}</p>
                <p className="mt-1 text-[#A9B4C0]">{profileContent.location.replace(" - ", " · ")}</p>
              </div>
            </div>

            <p className="mt-5 font-semibold text-[#88C0D0]">## About</p>
            <p className="mt-1.5 font-medium text-[#E6EDF3]">{aboutDocument.intro[0]}</p>
            {aboutDocument.intro.slice(1).map((line) => (
              <p key={line} className="mt-2 leading-[1.65] text-[#A9B4C0]">
                {line}
              </p>
            ))}

            <p className="mt-5 font-semibold text-[#88C0D0]">## {aboutDocument.experienceSnapshot.title}</p>
            <p className="mt-3 font-medium text-[#E6EDF3]">{aboutDocument.experienceSnapshot.lead}</p>
            <p className="mt-3 leading-[1.65] text-[#A9B4C0]">
              I&apos;ve built backend services, automation platforms, internal tools, and authentication flows for systems where operational
              safety, consistency, and maintainability were essential.
            </p>

            <p className="mt-5 font-semibold text-[#88C0D0]">## How I work</p>
            {aboutDocument.focusAreas.map((area) => (
              <p key={area} className="mt-1.5 leading-[1.65] text-[#A9B4C0]">
                <span className="font-semibold text-[#88C0D0]">-</span>{" "}
                {area}
              </p>
            ))}

            <p className="mt-5 font-semibold text-[#88C0D0]">## What I&apos;m looking for</p>
            {aboutDocument.principles.map((principle) => (
              <p key={principle} className="mt-1.5 font-medium leading-[1.6] text-[#E6EDF3]">
                {principle}
              </p>
            ))}

            <p className="mt-5 text-[12px] font-semibold tracking-[0.04em] text-[#7D8896]">
              EOF
              <span className="cursor-blink ml-2 inline-block h-4 w-[3px] rounded-sm bg-[#A9B4C0] align-middle" aria-hidden />
            </p>
          </div>
        </article>
      </WindowFrame>
    </PageContainer>
  );
}
