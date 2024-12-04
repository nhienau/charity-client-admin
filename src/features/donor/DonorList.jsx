import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationGroup from "@/ui/PaginationGroup";
import Spinner from "@/ui/Spinner";
import { useDonors } from "./useDonors";

function DonorList() {
  const { isLoading, data: donors, isFetching } = useDonors();

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  const { content } = donors;

  if (content.length === 0) {
    return <p className="text-center">Không tìm thấy chiến dịch</p>;
  }

  return (
    <>
      {/* <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Chiến dịch</TableHead>
            <TableHead className="w-[160px] text-right">Số tiền</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Ẩn danh</TableHead>
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
      </Table> */}
      <PaginationGroup pageInfo={donors} />
    </>
  );
}

export default DonorList;
