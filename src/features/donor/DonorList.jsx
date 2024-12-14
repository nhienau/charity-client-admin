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
import DonorRow from "./DonorRow";

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
      <Table className="text-base">
        <TableHeader>
          <TableRow>
            <TableHead>Mã sinh viên</TableHead>
            <TableHead>Tên</TableHead>
            <TableHead>Số điện thoại</TableHead>
            <TableHead></TableHead>
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
            content.map((donor) => <DonorRow donor={donor} key={donor.id} />)
          )}
        </TableBody>
      </Table>
      <PaginationGroup pageInfo={donors} />
    </>
  );
}

export default DonorList;
