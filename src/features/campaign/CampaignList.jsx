import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCampaigns } from "@/features/campaign/useCampaigns";
import PaginationGroup from "@/ui/PaginationGroup";
import SearchBar from "@/ui/SearchBar";
import Spinner from "@/ui/Spinner";
import { commafy, getTimeDiffStr } from "@/utils/helpers";
import { Image } from "lucide-react";
import {
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineXMark,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import DeleteCampaign from "./DeleteCampaign";

function CampaignList() {
  const { isLoading, data: campaigns, isFetching } = useCampaigns();

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  const { content } = campaigns;

  return (
    <>
      <div className="flex items-center justify-between">
        <SearchBar
          queryParamKey="query"
          pageParamKey="page"
          inputPlaceholder="Tìm kiếm chiến dịch..."
          isLoading={isLoading || isFetching}
          className="w-80 max-w-80"
        />
        <Link
          to="/app/campaign/create"
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg border-[1px] border-solid border-slate-400 bg-slate-100 px-3 py-2 text-slate-800 transition-colors hover:bg-slate-300"
        >
          <HiOutlinePlus className="h-5 w-5 shrink-0 text-slate-800" />
          <span>Tạo chiến dịch</span>
        </Link>
      </div>
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <Table className="text-base">
          <TableHeader>
            <TableRow>
              <TableHead>Tên</TableHead>
              <TableHead>Giảng viên phụ trách</TableHead>
              <TableHead>Thời hạn</TableHead>
              <TableHead>Tiến độ</TableHead>
              <TableHead>Mục tiêu</TableHead>
              <TableHead>Lượt quyên góp</TableHead>
              <TableHead className="max-w-28"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="table-cell">
                  <span className="flex justify-center">
                    Không tìm thấy chiến dịch
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              content.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.lecturer.name}</TableCell>
                  <TableCell>
                    {getTimeDiffStr(
                      new Date(row.closeDate),
                      new Date(),
                      "Đã đóng",
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {commafy(row.currentAmount)} đ
                  </TableCell>
                  <TableCell className="text-right">
                    {commafy(row.targetAmount)} đ
                  </TableCell>
                  <TableCell>{row.donationCount}</TableCell>
                  <TableCell className="table-cell max-w-28">
                    <div className="flex items-center justify-between gap-1">
                      <Link
                        to={`/app/campaign/images/${row.id}`}
                        className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300"
                      >
                        <Image className="h-6 w-6" />
                      </Link>
                      <Link
                        to={`/app/campaign/edit/${row.id}`}
                        className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300"
                      >
                        <HiOutlinePencil className="h-6 w-6" />
                      </Link>
                      <DeleteCampaign campaign={row}>
                        <button className="shrink-0 rounded-md p-1 transition-colors hover:bg-slate-300">
                          <HiOutlineXMark className="h-6 w-6" />
                        </button>
                      </DeleteCampaign>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationGroup pageInfo={campaigns} />
    </>
  );
}

export default CampaignList;
