import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDonorDonation } from "./useDonorDonation";
import DonationRow from "./DonationRow";
import Spinner from "@/ui/Spinner";
import PaginationGroup from "@/ui/PaginationGroup";

function DonationList() {
  const { isLoading, isFetching, data } = useDonorDonation();

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  const { content } = data;

  return (
    <>
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25rem]">Chiến dịch</TableHead>
            <TableHead className="w-[160px] text-right">Số tiền</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Tên</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="table-cell">
                <span className="flex justify-center">
                  Không tìm thấy kết quả
                </span>
              </TableCell>
            </TableRow>
          ) : (
            content.map((donation) => (
              <DonationRow donation={donation} key={donation.id} />
            ))
          )}
        </TableBody>
      </Table>
      <PaginationGroup pageInfo={data} />
    </>
  );
}

export default DonationList;
