function Spinner({ size = "sm", className }) {
  const base =
    "inline-block animate-spin rounded-full border-solid border-current border-e-transparent text-slate-700 motion-reduce:animate-[spin_1.5s_linear_infinite]";

  const styles = {
    sm: "h-4 w-4 border-2",
    md: "h-10 w-10 border-8",
    lg: "h-16 w-16 border-[12px]",
  };

  return (
    <div className={`${base} ${styles[size]} ${className}`} role="status"></div>
  );
}

export default Spinner;
