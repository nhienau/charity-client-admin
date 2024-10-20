import OptimizedImage from "@/ui/OptimizedImage";
import { useCheckboxes } from "@/contexts/CheckboxesContext";

function ImageItem({ image }) {
  const { id, url } = image;
  const { add, remove, checked } = useCheckboxes();

  function handleChange(e) {
    const checked = e.target.checked;
    checked ? add(id) : remove(id);
  }

  return (
    <div className="relative aspect-video overflow-visible rounded-lg bg-slate-50 p-4 shadow-md">
      <a href={url} target="_blank">
        <OptimizedImage
          url={url}
          className="aspect-video h-full w-full object-contain"
        />
      </a>
      <div className="absolute left-[-1rem] top-[-1rem] flex items-center justify-center rounded-full bg-slate-200 p-2 transition-colors has-[input:hover]:bg-slate-400">
        <input
          type="checkbox"
          checked={checked.includes(id)}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default ImageItem;
