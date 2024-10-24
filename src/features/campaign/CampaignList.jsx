import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCampaigns } from "@/features/campaign/useCampaigns";
import CampaignRow from "./CampaignRow";
import PaginationGroup from "@/ui/PaginationGroup";
import Spinner from "@/ui/Spinner";

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
              content.map((row) => <CampaignRow campaign={row} key={row.id} />)
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationGroup pageInfo={campaigns} />
    </>
  );
}

export default CampaignList;
