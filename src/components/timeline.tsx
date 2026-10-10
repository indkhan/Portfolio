import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Orientation = "vertical" | "horizontal";

export interface TimelineItemProps {
  children: ReactNode;
  className?: string;
}

export interface TimelineProps {
  children: ReactNode;
  className?: string;
  orientation?: Orientation;
}

export interface TimelineConnectItemProps {
  children: ReactNode;
  className?: string;
}

export function TimelineConnectItem({
  children,
  className,
}: TimelineConnectItemProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center self-stretch",
        className,
      )}
    >
      <div
        data-timeline-line
        className={cn(
          "absolute bg-border",
          "group-data-[orientation=vertical]:left-1/2 group-data-[orientation=vertical]:-translate-x-1/2",
          "group-data-[orientation=vertical]:top-0 group-data-[orientation=vertical]:h-[calc(50%+var(--timeline-gap)+50%)]",
          "group-data-[orientation=vertical]:w-px",
          "group-data-[orientation=horizontal]:top-1/2 group-data-[orientation=horizontal]:-translate-y-1/2",
          "group-data-[orientation=horizontal]:left-1/2 group-data-[orientation=horizontal]:w-[calc(50%+var(--timeline-gap)+50%)]",
          "group-data-[orientation=horizontal]:h-px",
        )}
      />
      <div className="relative z-20 shrink-0">{children}</div>
    </div>
  );
}

export function TimelineItem({ children, className }: TimelineItemProps) {
  return <div className={cn("relative", className)}>{children}</div>;
}

export function Timeline({
  children,
  className,
  orientation = "vertical",
}: TimelineProps) {
  return (
    <div
      data-orientation={orientation}
      className={cn(
        "group relative [--timeline-gap:2rem]",
        orientation === "vertical" && "flex w-full flex-col gap-4 p-4",
        orientation === "horizontal" && "flex h-full flex-row gap-4 p-4",
        className,
      )}
    >
      <div
        className={cn(
          "relative [&>*:last-child_[data-timeline-line]]:hidden",
          orientation === "vertical" && "w-full space-y-8",
          orientation === "horizontal" && "flex h-full flex-row gap-8",
        )}
      >
        {children}
      </div>
    </div>
  );
}
