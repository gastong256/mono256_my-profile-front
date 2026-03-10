import Link from "next/link";

import { HeaderClock } from "@/components/shared/system/header-clock";
import { profileContent } from "@/content/profile";

import { HeaderShortcuts } from "./header-shortcuts";
import { HeaderShortcutsMenu } from "./header-shortcuts-menu";
import { PageContainer } from "./page-container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 shrink-0 bg-background/55 backdrop-blur-md">
      <div className="w-full pt-2 md:pt-3">
        <div className="mx-auto w-[92vw] rounded-2xl border border-interactive-border/80 bg-[linear-gradient(180deg,rgba(16,24,42,0.86),rgba(10,16,30,0.78))] shadow-card md:w-[80vw]">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-1.5 px-4 py-1.5 lg:grid-cols-[1fr_auto_1fr] lg:gap-2 lg:px-6 lg:py-2">
            <Link
              href="/"
              title="Gastón Germán Gonzalez | Software Engineer"
              className="group flex min-w-0 items-center justify-start gap-3 lg:gap-3.5"
            >
              <BrandIcon />
              <span className="min-w-0 text-left">
                <span className="block truncate font-sans text-[12px] font-semibold tracking-[0.01em] text-foreground transition-colors group-hover:text-foreground/95 md:inline md:text-[13px]">
                  Gastón Germán Gonzalez
                </span>
                <span className="mx-1.5 hidden text-foreground/35 md:inline">|</span>
                <span className="mt-0.5 block font-mono text-[10px] tracking-[0.06em] text-brand/90 transition-colors group-hover:text-brand md:mt-0 md:inline md:text-[11px]">
                  {profileContent.role}
                </span>
              </span>
            </Link>

            <div className="justify-self-end lg:hidden">
              <HeaderShortcutsMenu />
            </div>

            <div className="hidden lg:block">
              <HeaderClock />
            </div>

            <div className="hidden justify-self-end lg:block">
              <p className="flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-foreground/72 lg:text-xs">
                <span>{profileContent.location}</span>
                <OnlineStatusIcon />
              </p>
            </div>
          </div>
        </div>
      </div>

      <PageContainer className="hidden py-2 lg:block lg:py-2.5">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-2 lg:gap-2.5">
          <HeaderShortcuts />
        </div>
      </PageContainer>
    </header>
  );
}

function BrandIcon() {
  return (
    <svg
      viewBox="0 0 280 280"
      role="img"
      aria-label="G subscript 3 icon"
      className="h-6 w-6 shrink-0 md:h-7 md:w-7"
    >
      <path
        fill="#88C0D0"
        d="
          M42 52
          H152
          V70
          H60
          V210
          H130
          V174
          H98
          V156
          H152
          V228
          H42
          Z
        "
      />
      <path
        fill="#EBCB8B"
        d="
          M162 72
          H210
          C220 72 228 75 234 80
          C240 85 243 92 243 101
          C243 110 239 117 231 121
          C239 125 245 132 245 143
          C245 154 242 162 235 168
          C229 174 220 177 209 177
          H162
          V162
          H207
          C213 162 217 161 220 158
          C223 156 225 152 225 147
          C225 143 223 139 219 137
          C216 135 211 134 204 134
          H177
          V120
          H203
          C209 120 214 119 217 116
          C220 114 222 110 222 106
          C222 102 220 98 217 96
          C214 94 209 92 203 92
          H162
          V72
          Z
        "
      />
    </svg>
  );
}

function OnlineStatusIcon() {
  return (
    <svg viewBox="0 0 32 32" className="h-3.5 w-3.5 text-[#32cd32]" aria-hidden>
      <path
        d="M16,3C10.5,3,6,7.5,6,13c0,8.4,9,15.5,9.4,15.8c0.2,0.1,0.4,0.2,0.6,0.2s0.4-0.1,0.6-0.2C17,28.5,26,21.4,26,13 C26,7.5,21.5,3,16,3z M16,17c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4S18.2,17,16,17z"
        fill="currentColor"
      />
    </svg>
  );
}
