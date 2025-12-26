import type { ReactNode } from "react";
import { cn } from "@/utils/formatting";

type SvgVariant = "outline" | "solid" | "custom";

export interface SvgProps {
  variant?: SvgVariant;
  draw?: string[];
  viewBox?: string;
  width?: number;
  height?: number;
  current?: boolean;
  className?: string;
  children?: ReactNode;
}
export const Svg = ({
  variant = "solid",
  draw = [],
  viewBox,
  width,
  height,
  current = false,
  className,
  children,
}: Readonly<SvgProps>) => {
  const isSolid = variant === "solid";
  const isOutline = variant === "outline";
  const isCustom = variant === "custom";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={isCustom ? viewBox : "0 0 24 24"}
      width={width}
      height={height}
      aria-hidden="true"
      className={cn(
        "pointer-events-none shrink-0",
        current && (isCustom || isSolid) && "fill-current",
        current && (isCustom || isOutline) && "outline-current",
        className
      )}
    >
      {isCustom
        ? children
        : draw.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={isOutline ? "currentColor" : undefined}
              strokeWidth={isOutline ? 1.5 : undefined}
              strokeLinecap={isOutline ? "round" : undefined}
              strokeLinejoin={isOutline ? "round" : undefined}
              fill={isSolid ? "currentColor" : "none"}
              fillRule={isSolid ? "evenodd" : undefined}
              clipRule={isSolid ? "evenodd" : undefined}
            />
          ))}
    </svg>
  );
};

Svg.displayName = "Svg";
