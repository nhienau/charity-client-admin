import { useCheckboxes } from "@/contexts/CheckboxesContext";
import AddImage from "./AddImage";
import DeleteImage from "./DeleteImage";

function ImageCount() {
  const { selectAll, clearAll, checked, numElements } = useCheckboxes();

  function handleChange(e) {
    const checked = e.target.checked;
    checked ? selectAll() : clearAll();
  }

  return (
    <div
      className={`flex flex-col gap-2 md:flex-row md:items-center ${numElements === 0 ? "md:justify-end" : "md:justify-between"}`}
    >
      {numElements !== 0 && (
        <div>
          <input
            type="checkbox"
            onChange={handleChange}
            checked={checked.length !== 0}
            className="mr-2"
          />
          <span>
            {checked.length === 0
              ? "Chọn tất cả"
              : `Đã chọn ${checked.length}/${numElements} hình ảnh`}
          </span>
        </div>
      )}
      <div>
        {checked.length === 0 ? <AddImage /> : <DeleteImage images={checked} />}
      </div>
    </div>
  );
}

export default ImageCount;
