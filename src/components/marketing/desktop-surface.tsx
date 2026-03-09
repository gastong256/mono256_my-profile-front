import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { WindowFrame } from "@/components/ui/window-frame";
import { profileContent } from "@/content/profile";

export function DesktopSurface() {
  return (
    <section className="h-full py-1 md:py-2">
      <PageContainer className="h-full">
        <div className="mx-auto flex h-full w-full max-w-[1120px] min-h-0">
          <WindowFrame
            title="welcome.cli"
            subtitle="gastong256@dev: ~"
            status="read-only"
            size="fixed"
            help={{
              section: "Home Terminal",
              path: "~/",
              items: [
                "Read a quick technical introduction and profile summary.",
                "Navigate to About, Projects, Contact, or Build yours sections.",
                "Use semantic routes for each section view."
              ]
            }}
            className="h-full w-full border-white/10 bg-[linear-gradient(180deg,rgba(20,22,35,0.76),rgba(8,10,17,0.88))]"
            bodyClassName="bg-[linear-gradient(180deg,rgba(10,12,19,0.34),rgba(8,10,16,0.08))] p-4 md:p-7"
          >
            <div className="font-mono text-[13px] leading-7 md:text-[15px] md:leading-8">
              <div className="space-y-0 leading-5 md:leading-6">
                <p>
                  <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                  <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">make init</span>
                </p>
                <p>
                  <span className="text-xs font-semibold uppercase text-[#7D8896]">[SYSTEM]</span>{" "}
                  <span className="text-sm font-normal text-[#A9B4C0]">Booting portfolio interface...</span>
                </p>
                <p>
                  <span className="text-xs font-semibold uppercase text-[#A3BE8C]">[OK]</span>{" "}
                  <span className="text-sm font-normal text-[#A9B4C0]">Identity loaded</span>
                </p>
                <p>
                  <span className="text-xs font-semibold uppercase text-[#A3BE8C]">[OK]</span>{" "}
                  <span className="text-sm font-normal text-[#A9B4C0]">Navigation ready</span>
                </p>
                <p className="my-0 overflow-hidden whitespace-nowrap text-[#253041]">────────────────────────────────────────────────────────────</p>
                <p className="mt-1.5 font-sans text-[18px] font-extrabold tracking-[0.08em] text-[#E6EDF3] md:text-[24px]">GASTON GONZALEZ</p>
                <p className="mt-1.5 font-sans text-[12px] font-semibold tracking-[0.04em] text-[#88C0D0] md:text-[14px]">{"// SENIOR SOFTWARE ENGINEER"}</p>
                <p className="mt-3 font-sans text-[15px] font-medium leading-6 text-[#E6EDF3] md:text-[17px] md:leading-7">
                  <span className="mr-2 font-mono font-semibold text-[#88C0D0]">&gt;</span>
                  Backend engineer focused on scalable systems, reliable APIs, and architecture that holds up in production.
                </p>
                <p className="mt-2 font-sans text-[14px] font-normal leading-6 text-[#A9B4C0] md:text-[15px] md:leading-7">
                  <span className="mr-2 font-mono font-semibold text-[#88C0D0]">&gt;</span>
                  I build microservices, automation platforms, and internal tools with a strong DevOps and systems mindset.
                </p>
                <p className="mt-2 font-sans text-[14px] font-normal leading-6 text-[#A9B4C0] md:text-[15px] md:leading-7">
                  <span className="mr-2 font-mono font-semibold text-[#88C0D0]">&gt;</span>
                  Background in SaaS, critical infrastructure, and cloud-native delivery.
                </p>
                <p className="my-0 overflow-hidden whitespace-nowrap text-[#253041]">────────────────────────────────────────────────────────────</p>
              </div>
              <p>
                <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">cat quick_info.txt</span>
              </p>
              <p>
                <span className="font-semibold text-[#7D8896]">focus</span>
                <span className="text-[#7D8896]">:</span> <span className="font-medium text-[#E6EDF3]">Backend · Systems Architecture · DevOps Culture</span>
              </p>
              <p>
                <span className="font-semibold text-[#7D8896]">stack</span>
                <span className="text-[#7D8896]">:</span> <span className="font-medium text-[#E6EDF3]">Python · FastAPI · Django · Cloud · CI/CD</span>
              </p>
              <p>
                <span className="font-semibold text-[#7D8896]">background</span>
                <span className="text-[#7D8896]">:</span> <span className="font-medium text-[#E6EDF3]">SaaS · Banking Infrastructure · Automation</span>
              </p>
              <p>
                <span className="font-semibold text-[#7D8896]">status</span>
                <span className="text-[#7D8896]">:</span> <span className="font-medium text-[#A3BE8C]">Open to consulting and senior engineering roles</span>
              </p>
              <p>
                <span className="font-semibold text-[#7D8896]">location</span>
                <span className="text-[#7D8896]">:</span>{" "}
                <span className="font-medium text-[#E6EDF3]">{profileContent.location.replace(" - ", " · ")}</span>
              </p>
              <p className="mt-2">
                <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">ls /products</span>
              </p>
              <p>
                <span className="font-semibold text-[#EBCB8B]">Build Yours</span>
                <span className="font-normal text-[#7D8896]">{" → "}</span>
                <span className="font-normal text-[#A9B4C0]">Template-based portfolio builder for developers</span>
              </p>
              <p className="-mt-2">
                <span className="inline-block w-[14ch]" aria-hidden />
                <span className="font-medium text-[#7D8896]">GitHub + Vercel ready</span>
              </p>
              <p className="mt-2">
                <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">open --nav</span>{" "}
                <Link href="/about" className="font-medium text-[#A9B4C0] hover:text-[#E6EDF3]">
                  [Profile]
                </Link>{" "}
                <Link href="/projects" className="font-medium text-[#A9B4C0] hover:text-[#E6EDF3]">
                  [Projects]
                </Link>{" "}
                <Link href="/contact" className="font-medium text-[#A9B4C0] hover:text-[#E6EDF3]">
                  [Contact]
                </Link>{" "}
                <Link href="/product" className="font-medium text-[#88C0D0] hover:text-[#E6EDF3]">
                  [Build yours]
                </Link>
              </p>
              <p>
                <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                <span className="cursor-blink inline-block h-5 w-[4px] rounded-sm bg-[#E6EDF3] align-middle opacity-95" aria-hidden />
              </p>
            </div>
          </WindowFrame>
        </div>
      </PageContainer>
    </section>
  );
}
