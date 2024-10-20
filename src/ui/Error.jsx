import { HiOutlineArrowLeft } from "react-icons/hi2";
import { PiWarningCircleLight } from "react-icons/pi";

function Error({ title, message, onClick }) {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-50 text-slate-800">
      <div className="mx-auto my-0 flex max-w-6xl flex-col items-center justify-center">
        <div>
          <PiWarningCircleLight className="h-16 w-16" />
        </div>
        <h1 className="mb-1 text-center text-2xl font-bold">
          {title || "Có lỗi xảy ra."}
        </h1>
        {message && <p className="mb-2 text-center">{message}</p>}
        <a
          href="/"
          onClick={onClick}
          className="flex items-center gap-2 rounded-md bg-slate-200 px-4 py-2 hover:bg-slate-300"
        >
          <HiOutlineArrowLeft className="h-5 w-5 shrink-0" />
          <span className="line-clamp-1">Quay lại trang chủ</span>
        </a>
      </div>
    </main>
  );
}

export default Error;
