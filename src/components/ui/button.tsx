import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-onyx text-ivory hover:bg-charcoal border border-onyx",
        gold: "bg-gold text-onyx hover:bg-gold-soft border border-gold",
        outline:
          "border border-onyx/80 bg-transparent text-onyx hover:bg-onyx hover:text-ivory",
        "outline-ivory":
          "border border-ivory/40 bg-transparent text-ivory hover:bg-ivory hover:text-onyx",
        ghost: "text-onyx hover:bg-champagne",
        link: "text-onyx underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm: "h-9 px-4 text-xs tracking-[0.12em] uppercase",
        md: "h-11 px-6 text-[0.8rem] tracking-[0.12em] uppercase",
        lg: "h-14 px-9 text-[0.8rem] tracking-[0.16em] uppercase",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
