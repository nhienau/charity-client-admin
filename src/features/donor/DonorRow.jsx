import { TableCell, TableRow } from "@/components/ui/table";
import { HiOutlineInformationCircle, HiOutlineXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";
import DeleteDonor from "./DeleteDonor";

function DonorRow({ donor }) {
  const { id, defaultName, phoneNumber } = donor;
  return (
    <TableRow>
      <TableCell>{defaultName ? id : "(Không)"}</TableCell>
      <TableCell>{defaultName || "(Không)"}</TableCell>
      <TableCell>{phoneNumber || "(Không)"}</TableCell>
      <TableCell className="table-cell max-w-28">
        <div className="flex items-center gap-1">
          <Link
            to={`/app/user/${id}`}
            className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300"
            title="Xem lịch sử quyên góp"
          >
            <HiOutlineInformationCircle className="h-6 w-6" />
          </Link>
          {defaultName && (
            <DeleteDonor donor={donor}>
              <button className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300">
                <HiOutlineXMark className="h-6 w-6" />
              </button>
            </DeleteDonor>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export default DonorRow;
