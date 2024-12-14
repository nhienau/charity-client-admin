import DonationSearchFilter from "@/features/donation/DonationSearchFilter";
import SearchResultList from "@/features/donation/SearchResultList";

function Donation() {
  return (
    <>
      <h1 className="text-3xl font-bold">Quyên góp</h1>
      <DonationSearchFilter />
      <div className="flex flex-col gap-4">
        <SearchResultList />
      </div>
    </>
  );
}

export default Donation;
