import CreateDonorForm from "@/features/donor/CreateDonorForm";
import DonorList from "@/features/donor/DonorList";
import DonorSearch from "@/features/donor/DonorSearch";

function User() {
  return (
    <>
      <h1 className="text-3xl font-bold">Người dùng</h1>
      <div className="flex flex-col justify-between gap-4 sm:flex-row-reverse sm:items-center">
        <div className="self-end">
          <CreateDonorForm />
        </div>
        <DonorSearch />
      </div>
      <DonorList />
    </>
  );
}

export default User;
