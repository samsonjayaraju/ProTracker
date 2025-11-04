import { cn } from "./utils";

export function GlassCard({ children, className, variant = 'default', blur = 'md' }) {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg'
  };

  const variantClasses = {
    default: 'bg-white/10 border-white/20',
    light: 'bg-white/20 border-white/30',
    dark: 'bg-black/10 border-white/10'
  };

  return (
    <div
      className={cn(
        'rounded-lg border shadow-lg',
        blurClasses[blur],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
}