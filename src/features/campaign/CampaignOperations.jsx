import { Link } from "react-router-dom";
import { HiOutlinePlus } from "react-icons/hi2";
import { useCampaigns } from "./useCampaigns";
import SearchBar from "@/ui/SearchBar";

function CampaignOperations() {
  const { isLoading, isFetching } = useCampaigns();

  return (
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
  );
}

export default CampaignOperations;
