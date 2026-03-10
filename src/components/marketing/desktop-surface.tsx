import { PageContainer } from "@/components/layout/page-container";
import { WindowFrame } from "@/components/shared/window/window-frame";

export function DesktopSurface() {
  return (
    <section className="py-1 md:h-full md:py-2">
      <PageContainer className="md:h-full">
        <div className="mx-auto flex w-full max-w-[1120px] min-h-0 md:h-full">
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
            bodyClassName="bg-[linear-gradient(180deg,rgba(10,12,19,0.34),rgba(8,10,16,0.08))] p-4 md:p-7 lg:p-6"
          >
            <div className="font-mono text-[13px] leading-7 md:text-[15px] md:leading-8">
              <div className="space-y-0">
                <p>
                  <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                  <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">whoami</span>
                </p>
                <div className="mt-2">
                  <p className="font-sans text-[18px] font-extrabold leading-tight tracking-[0.08em] text-[#E6EDF3] md:text-[24px]">GASTON GONZALEZ</p>
                  <p className="mt-0.5 font-sans text-[12px] font-semibold leading-tight tracking-[0.04em] text-[#88C0D0] md:text-[14px]">Senior Software Engineer</p>
                  <p className="mt-1.5 font-sans text-[13px] font-medium leading-[1.35rem] text-[#A9B4C0] md:text-[14px] md:leading-[1.5rem]">Argentina · Remote worldwide</p>
                </div>
              </div>

              <p className="mt-3 md:mt-4 lg:mt-3.5">
                <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">cat summary.txt</span>
              </p>
              <div className="mt-2 space-y-0.5 lg:space-y-0.5">
                <p className="font-sans text-[14px] font-medium leading-[1.35rem] text-[#E6EDF3] md:text-[15px] md:leading-[1.5rem]">
                  Software engineer focused on building reliable systems, clean architectures, and software that holds up in production.
                </p>
                <p className="font-sans text-[14px] font-normal leading-[1.35rem] text-[#A9B4C0] md:text-[15px] md:leading-[1.5rem]">
                  Strong interest in automation, DevOps culture, and scalable service design.
                </p>
              </div>

              <p className="mt-3 md:mt-4 lg:mt-3.5">
                <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">sysinfo</span>
              </p>
              <div className="mt-2 space-y-0.5 leading-[1.35rem] md:leading-[1.5rem] lg:space-y-0.5">
                <p>
                  <span className="block font-semibold text-[#7D8896] lg:hidden">engineer_role</span>
                  <span className="hidden font-semibold text-[#7D8896] lg:inline">engineer_role....</span>
                  <span className="block pl-3 font-medium text-[#E6EDF3] lg:ml-2 lg:inline lg:pl-0">Senior Software Engineer</span>
                </p>
                <p>
                  <span className="block font-semibold text-[#7D8896] lg:hidden">focus</span>
                  <span className="hidden font-semibold text-[#7D8896] lg:inline">focus............</span>
                  <span className="block pl-3 font-medium text-[#E6EDF3] lg:ml-2 lg:inline lg:pl-0">Systems design · Automation · DevOps culture</span>
                </p>
                <p>
                  <span className="block font-semibold text-[#7D8896] lg:hidden">stack</span>
                  <span className="hidden font-semibold text-[#7D8896] lg:inline">stack............</span>
                  <span className="block pl-3 font-medium text-[#E6EDF3] lg:ml-2 lg:inline lg:pl-0">Python · Node · FastAPI · Cloud · CI/CD</span>
                </p>
                <p>
                  <span className="block font-semibold text-[#7D8896] lg:hidden">experience</span>
                  <span className="hidden font-semibold text-[#7D8896] lg:inline">experience.......</span>
                  <span className="block pl-3 font-medium text-[#E6EDF3] lg:ml-2 lg:inline lg:pl-0">SaaS platforms · Banking infrastructure</span>
                </p>
                <p>
                  <span className="block font-semibold text-[#7D8896] lg:hidden">availability</span>
                  <span className="hidden font-semibold text-[#7D8896] lg:inline">availability.....</span>
                  <span className="block pl-3 font-medium text-[#A3BE8C] lg:ml-2 lg:inline lg:pl-0">Open to consulting and senior roles</span>
                </p>
              </div>

              <p className="mt-3 md:mt-4 lg:mt-3.5">
                <span className="text-[12px] font-medium text-[#88C0D0] md:text-[13px]">gastong256@dev:~$</span>{" "}
                <span className="text-[12px] font-normal text-[#C7CFDA] md:text-[13px]">ls /product</span>
              </p>
              <div className="mt-2 space-y-0">
                <p className="leading-[1.05rem] md:leading-[1.2rem]">
                  <span className="font-semibold text-[#EBCB8B]">build-yours/</span>
                </p>
                <p className="leading-[1.05rem] text-[#A9B4C0] md:leading-[1.2rem]">
                  <span className="lg:hidden">└─ developer site builder</span>
                  <span className="hidden lg:inline">└─ developer site builder</span>
                  <span className="mt-0.5 block lg:hidden">
                    <span className="invisible">└─ </span>
                    <span className="inline-block pl-2">github-connected</span>
                  </span>
                  <span className="block lg:hidden">
                    <span className="invisible">└─ </span>
                    <span className="inline-block pl-2">vercel-ready</span>
                  </span>
                  <span className="block lg:hidden">
                    <span className="invisible">└─ </span>
                    <span className="inline-block pl-2">2-click deploy</span>
                  </span>
                  <span className="hidden whitespace-pre-wrap lg:block">{"   "}github-connected · vercel-ready · 2-click deploy</span>
                </p>
              </div>
              <p className="mt-3 lg:mt-3.5">
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
