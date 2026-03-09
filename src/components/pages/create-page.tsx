"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { productContent } from "@/content/product";
import { Button, buttonVariants } from "@/components/ui/button";
import { WindowFrame } from "@/components/ui/window-frame";

import { PageContainer } from "@/components/layout/page-container";

const templateOptions = [
  {
    id: "minimal-shell",
    name: "Minimal Shell",
    description: "Clean terminal-forward layout with restrained accents."
  },
  {
    id: "docs-portfolio",
    name: "Docs Portfolio",
    description: "Documentation-style structure focused on readability."
  },
  {
    id: "product-card",
    name: "Product Card",
    description: "Card-oriented portfolio optimized for quick scanning."
  }
] as const;

export function CreatePageContent() {
  const router = useRouter();
  const [githubConnected, setGithubConnected] = useState(false);
  const [vercelConnected, setVercelConnected] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const canInstall = githubConnected && vercelConnected && Boolean(selectedTemplate);
  const activeTemplate = templateOptions.find((option) => option.id === selectedTemplate) ?? null;

  return (
    <PageContainer className="flex h-full min-h-0 flex-col py-1 md:py-2">
      <WindowFrame
        title="BuildYours.exe"
        subtitle="Setup"
        size="fixed"
        className="w-full"
        bodyClassName="p-4 md:p-4"
        status="interactive"
        help={{
          section: "Create",
          path: "~/BuildYours.exe/install",
          items: [
            "Preview the GitHub and Vercel connection flow, then choose a template.",
            "Run the preview installation to continue into the summary view."
          ],
          cta: {
            label: "Back To Overview",
            href: "/product"
          }
        }}
      >
        <div className="h-full overflow-y-auto md:overflow-hidden">
          <div className="flex min-h-full flex-col">
            <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">Step 2 of 2 · Connections</p>
            <h1 className="mt-1.5 text-xl font-semibold tracking-tight md:text-2xl">{productContent.installTitle}</h1>

            <div className="mt-3 grid min-h-0 flex-1 gap-2.5 lg:grid-cols-[370px_minmax(0,1fr)]">
              <div className="space-y-2.5">
                <ProviderCard
                  name="GitHub"
                  description="Connect repository access so the generator can map your profile and project metadata."
                  connected={githubConnected}
                  onConnect={() => setGithubConnected((state) => !state)}
                />
                <ProviderCard
                  name="Vercel"
                  description="Connect deployment access so the generated baseline can be built and published."
                  connected={vercelConnected}
                  onConnect={() => setVercelConnected((state) => !state)}
                />
                <TemplateSelector
                  options={templateOptions}
                  selectedTemplate={selectedTemplate}
                  onSelectTemplate={setSelectedTemplate}
                />
              </div>

              <PreviewPanel
                templateName={activeTemplate?.name ?? "No template selected"}
                templateDescription={activeTemplate?.description ?? "Select one template to continue installation."}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-3">
              <Link href="/product" className={buttonVariants({ variant: "secondary", size: "md" })}>
                Back
              </Link>
              <Button type="button" disabled={!canInstall} onClick={() => router.push("/result/installation-summary")} className="min-w-36">
                Run preview
              </Button>
            </div>
          </div>
        </div>
      </WindowFrame>
    </PageContainer>
  );
}

function ProviderCard({
  name,
  description,
  connected,
  onConnect
}: {
  name: string;
  description: string;
  connected: boolean;
  onConnect: () => void;
}) {
  return (
    <section className="rounded-lg border border-border/80 bg-surface/80 p-2.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-foreground">{name}</p>
          <p className="mt-0.5 text-xs text-foreground/75">{description}</p>
        </div>
        <span
          className={
            connected
              ? "inline-flex rounded-full border border-[#4fa770]/40 bg-[#4fa770]/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-[#8ce5ad]"
              : "inline-flex rounded-full border border-foreground/20 bg-foreground/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-foreground/70"
          }
        >
          {connected ? "connected" : "pending"}
        </span>
      </div>

      <div className="mt-2.5">
        <Button type="button" variant={connected ? "secondary" : "primary"} size="sm" onClick={onConnect}>
          {connected ? `Disconnect ${name}` : `Connect ${name}`}
        </Button>
      </div>
    </section>
  );
}

function TemplateSelector({
  options,
  selectedTemplate,
  onSelectTemplate
}: {
  options: typeof templateOptions;
  selectedTemplate: string | null;
  onSelectTemplate: (value: string | null) => void;
}) {
  return (
    <section className="rounded-lg border border-border/80 bg-surface/80 p-2.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-foreground">Template</p>
          <p className="mt-0.5 text-xs text-foreground/75">Select one base style.</p>
        </div>
        <span
          className={
            selectedTemplate
              ? "inline-flex rounded-full border border-[#4fa770]/40 bg-[#4fa770]/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-[#8ce5ad]"
              : "inline-flex rounded-full border border-foreground/20 bg-foreground/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide text-foreground/70"
          }
        >
          {selectedTemplate ? "selected" : "required"}
        </span>
      </div>

      <div className="mt-2.5">
        <select
          value={selectedTemplate ?? ""}
          onChange={(event) => onSelectTemplate(event.target.value || null)}
          className="h-10 w-full rounded-md border border-border bg-background/40 px-3 text-sm text-foreground outline-none ring-brand/30 focus:border-brand/60 focus:ring-2"
        >
          <option value="">Select a template</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

function PreviewPanel({
  templateName,
  templateDescription
}: {
  templateName: string;
  templateDescription: string;
}) {
  return (
    <aside className="rounded-lg border border-border/80 bg-surface/80 p-3 lg:p-4">
      <p className="font-mono text-[11px] uppercase tracking-wide text-foreground/60">Preview</p>
      <div className="mt-2 rounded-md border border-border/70 bg-background/25 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">Selected template</p>
        <p className="mt-1 text-sm font-semibold text-foreground">{templateName}</p>
        <p className="mt-1 text-[11px] text-foreground/70">{templateDescription}</p>
      </div>

      <div className="mt-2 rounded-md border border-border/70 bg-background/20 p-3">
        <p className="text-[11px] text-foreground/70">Template preview area</p>
      </div>
    </aside>
  );
}
