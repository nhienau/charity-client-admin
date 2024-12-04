import { cn } from "@/lib/utils";

function FormRow({ label, error, children, small = false }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        small
          ? ""
          : "md:grid md:grid-cols-[10rem,1fr,1.2fr] md:items-center md:gap-4",
      )}
    >
      {label && (
        <label htmlFor={children.props.id} className="font-semibold">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
