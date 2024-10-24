import CampaignList from "@/features/campaign/CampaignList";
import CampaignOperations from "@/features/campaign/CampaignOperations";

function Campaign() {
  return (
    <>
      <h1 className="text-3xl font-bold">Chiến dịch</h1>
      <CampaignOperations />
      <CampaignList />
    </>
  );
}

export default Campaign;
