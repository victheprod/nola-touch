import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em]",
  {
    variants: {
      variant: {
        gold: "bg-gold text-onyx",
        onyx: "bg-onyx text-gold",
        ivory: "bg-ivory/90 text-onyx",
        sale: "bg-[#8a2b2b] text-ivory",
        outline: "border border-onyx/25 text-onyx",
      },
    },
    defaultVariants: { variant: "gold" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
