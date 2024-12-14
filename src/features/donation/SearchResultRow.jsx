import { TableCell, TableRow } from "@/components/ui/table";
import { commafy, formatDateTime } from "@/utils/helpers";

function SearchResultRow({ donation }) {
  const {
    campaign: { name },
    amount,
    createdAt,
    showIdentity,
    donor,
    donorName,
  } = donation;
  return (
    <TableRow>
      <TableCell>
        {showIdentity ? (donor?.defaultName ?? donorName?.name) : "Nhà hảo tâm"}
      </TableCell>
      <TableCell>{name}</TableCell>
      <TableCell className="text-right">{`${commafy(amount)} đ`}</TableCell>
      <TableCell>{formatDateTime(createdAt)}</TableCell>
    </TableRow>
  );
}

export default SearchResultRow;
