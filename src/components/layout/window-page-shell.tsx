import type { ReactNode } from "react";

import { WindowFrame, type WindowFrameHelp, type WindowFrameSize, type WindowFrameStatus } from "@/components/ui/window-frame";
import { cn } from "@/lib/utils/cn";

import { PageContainer } from "./page-container";

type WindowPageShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  status?: WindowFrameStatus;
  help?: WindowFrameHelp;
  actions?: ReactNode;
  containerClassName?: string;
  windowClassName?: string;
  windowBodyClassName?: string;
  size?: WindowFrameSize;
};

export function WindowPageShell({
  children,
  title,
  subtitle,
  status,
  help,
  actions,
  containerClassName,
  windowClassName,
  windowBodyClassName,
  size = "fixed"
}: WindowPageShellProps) {
  return (
    <PageContainer className={cn("flex h-full min-h-0 flex-col py-1 md:py-2", containerClassName)}>
      <WindowFrame
        title={title}
        subtitle={subtitle}
        status={status}
        help={help}
        actions={actions}
        size={size}
        className={cn("w-full", windowClassName)}
        bodyClassName={windowBodyClassName}
      >
        {children}
      </WindowFrame>
    </PageContainer>
  );
}
