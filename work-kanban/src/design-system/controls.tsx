import type { ReactNode, SelectHTMLAttributes } from "react";
import { Button as ShadcnButton } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { NativeSelect } from "../components/ui/native-select";
import { Textarea } from "../components/ui/textarea";
import { cn } from "../lib/utils";

type ShadcnButtonProps = React.ComponentProps<typeof ShadcnButton>;
type ButtonVariant = "primary" | "outline" | "secondary" | "ghost" | "destructive" | "link";

type ButtonProps = Omit<ShadcnButtonProps, "variant"> & {
  variant?: ButtonVariant;
};

export function Button({ variant = "primary", className, ...props }: ButtonProps): JSX.Element {
  return (
    <ShadcnButton
      variant={variant === "primary" ? "default" : variant}
      className={cn(props.size === "icon" ? "size-10" : "h-10 px-4 py-2", className)}
      {...props}
    />
  );
}

export function Select({
  className,
  ...props
}: Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">): JSX.Element {
  return <NativeSelect className={cn("w-full", className)} {...props} />;
}

export function Field({ label, children }: { label: string; children: ReactNode }): JSX.Element {
  return (
    <Label className="grid gap-2 text-sm font-medium">
      {label}
      {children}
    </Label>
  );
}

export { Input, Textarea };
