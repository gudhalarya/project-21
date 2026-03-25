import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {}

// Static wrapper (no animations) to keep API parity with previous timeline content.
export const TimelineContent = forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div ref={ref} className={cn(className)} {...rest}>
        {children}
      </div>
    );
  }
);
TimelineContent.displayName = "TimelineContent";
