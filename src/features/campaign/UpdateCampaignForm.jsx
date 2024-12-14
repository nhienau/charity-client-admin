import Spinner from "@/ui/Spinner";
import { useCampaign } from "./useCampaign";
import PageNotFound from "@/pages/PageNotFound";
import CreateCampaignForm from "./CreateCampaignForm";

function UpdateCampaignForm() {
  const { isLoading, data, isFetching } = useCampaign();

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data || data?.error) {
    return <PageNotFound />;
  }

  // Prepare data
  const formData = {
    id: data.id,
    name: data.name,
    description: data.description,
    closeDate: new Date(data.closeDate),
    targetAmount: data.targetAmount,
    postId: data.postId,
    disbursementPostId: data.disbursementPostId,
    postDonationPostId: data.postDonationPostId,
    lecturer: data.lecturer,
  };

  return <CreateCampaignForm defaultValues={formData} mode="update" />;
}

export default UpdateCampaignForm;
