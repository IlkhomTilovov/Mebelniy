const VARIANTS = {
  primary: "bg-accent text-white hover:bg-accent-dark",
  secondary: "bg-transparent text-ink border border-ink/20 hover:border-ink/40",
  ghost: "bg-transparent text-ink-soft hover:text-ink",
};

export default function Button({
  as: Component = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
