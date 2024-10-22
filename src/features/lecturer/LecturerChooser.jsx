import Spinner from "@/ui/Spinner";
import { useLecturers } from "./useLecturers";
import SearchBar from "@/ui/SearchBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationGroup from "@/ui/PaginationGroup";

function LecturerChooser({
  pageParam = "page",
  queryParam = "query",
  currentLecturer,
  setLecturer,
}) {
  const { isLoading, data, isFetching } = useLecturers(pageParam, queryParam);

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );

  const { content } = data;

  return (
    <>
      <div className="flex items-center">
        <SearchBar
          queryParamKey={queryParam}
          pageParamKey={pageParam}
          inputPlaceholder="Tìm kiếm giảng viên..."
          isLoading={isLoading || isFetching}
          className="w-80 max-w-80"
        />
      </div>
      <div>
        <Table className="text-base">
          <TableHeader>
            <TableRow>
              <TableHead className="w-6"></TableHead>
              <TableHead>Tên</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="table-cell">
                  <span className="flex justify-center">
                    Không tìm thấy giảng viên
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              content.map((row) => (
                <TableRow
                  key={row.id}
                  className="has-[input:checked]:bg-slate-200"
                >
                  <TableCell className="w-6">
                    <input
                      type="radio"
                      name="lecturer"
                      id={row.id}
                      defaultChecked={currentLecturer?.id === row.id}
                      onChange={() => setLecturer(row)}
                    />
                  </TableCell>
                  <TableCell>
                    <label htmlFor={row.id}>{row.name}</label>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationGroup pageInfo={data} />
    </>
  );
}

export default LecturerChooser;
