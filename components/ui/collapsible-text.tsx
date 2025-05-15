"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface CollapsibleTextProps {
  text: string;
  maxLines?: number;
  className?: string;
}

export function CollapsibleText({
  text,
  maxLines = 3,
  className,
}: CollapsibleTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (!element) return;

      // Check if the content is taller than the line height * max lines
      const lineHeight = Number.parseInt(
        window.getComputedStyle(element).lineHeight
      );
      const maxHeight = lineHeight * maxLines || element.clientHeight;

      setIsOverflowing(element.scrollHeight > maxHeight);
    };

    checkOverflow();

    // Re-check on window resize
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [text, maxLines]);

  return (
    <div className={className}>
      <p
        ref={textRef}
        className={cn(
          "line-clamp-4",
          "whitespace-pre-line text-muted-foreground transition-all duration-200",
          !isExpanded && `line-clamp-${maxLines}`
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      {isOverflowing && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 flex items-center text-primary hover:text-primary/80"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Thu gọn
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Xem thêm
            </>
          )}
        </Button>
      )}
    </div>
  );
}
