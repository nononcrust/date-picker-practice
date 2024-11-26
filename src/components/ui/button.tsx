import { cn } from "@/lib/utils";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva(
  cn(
    "h-9 px-4 text-[13px] leading-5",
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg transition-colors font-medium border",
    "disabled:pointer-events-none disabled:opacity-50",
    "hover:bg-primary-dark"
  ),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-dark border-primary hover:border-primary-dark",
        secondary:
          "bg-secondary text-main border-transparent hover:bg-secondary-dark",
        outlined: "bg-white border-border text-main hover:bg-hover",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonVariants> {
  startIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      type = "button",
      asChild = false,
      children,
      startIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        type={type}
        disabled={disabled}
        aria-disabled={disabled}
        {...props}
      >
        {startIcon && <Slot className="mr-2 w-4">{startIcon}</Slot>}
        <Slottable>{children}</Slottable>
      </Comp>
    );
  }
);
Button.displayName = "Button";
