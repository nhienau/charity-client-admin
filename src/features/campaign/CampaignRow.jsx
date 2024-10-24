import { TableCell, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Image } from "lucide-react";
import { HiOutlinePencil, HiOutlineXMark } from "react-icons/hi2";
import { commafy, getTimeDiffStr } from "@/utils/helpers";
import DeleteCampaign from "./DeleteCampaign";

function CampaignRow({ campaign }) {
  const {
    id,
    name,
    lecturer,
    currentAmount,
    targetAmount,
    donationCount,
    closeDate,
  } = campaign;

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{lecturer.name}</TableCell>
      <TableCell>
        {getTimeDiffStr(new Date(closeDate), new Date(), "Đã đóng")}
      </TableCell>
      <TableCell className="text-right">{commafy(currentAmount)} đ</TableCell>
      <TableCell className="text-right">{commafy(targetAmount)} đ</TableCell>
      <TableCell>{donationCount}</TableCell>
      <TableCell className="table-cell max-w-28">
        <div className="flex items-center justify-between gap-1">
          <Link
            to={`/app/campaign/images/${id}`}
            className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300"
          >
            <Image className="h-6 w-6" />
          </Link>
          <Link
            to={`/app/campaign/edit/${id}`}
            className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300"
          >
            <HiOutlinePencil className="h-6 w-6" />
          </Link>
          <DeleteCampaign campaign={campaign}>
            <button className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300">
              <HiOutlineXMark className="h-6 w-6" />
            </button>
          </DeleteCampaign>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default CampaignRow;
