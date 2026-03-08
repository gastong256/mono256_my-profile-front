import type { Metadata } from "next";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Result",
  description: "Generated website result placeholder route.",
  path: "/result"
});

type ResultPageProps = {
  params: {
    id: string;
  };
};

export default function ResultPage({ params }: ResultPageProps) {
  return (
    <PageContainer className="py-14 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Generation result</h1>
      <p className="mt-4 max-w-2xl text-sm text-foreground/75 md:text-base">
        Placeholder page for generated site output. Result id: <span className="font-mono">{params.id}</span>
      </p>
      <Link href="/create" className={`${buttonVariants({ variant: "primary", size: "md" })} mt-6`}>
        Generate Another
      </Link>
    </PageContainer>
  );
}
