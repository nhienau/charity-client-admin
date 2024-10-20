import { useCampaign } from "../campaign/useCampaign";
import { CheckboxesProvider } from "@/contexts/CheckboxesContext";
import Spinner from "@/ui/Spinner";
import PageNotFound from "@/pages/PageNotFound";
import ImageItem from "./ImageItem";
import ImageCount from "./ImageCount";

function ImageOperations() {
  const { isLoading, data: campaign, isFetching } = useCampaign();

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!campaign || campaign?.error) {
    return <PageNotFound />;
  }

  const { campaignImage } = campaign;
  const imageIds = campaignImage.map((i) => i.id);

  return (
    <>
      <div>
        <h1 className="mb-2 text-3xl font-bold">Hình ảnh chiến dịch</h1>
        <span className="text-slate-600">{campaign.name}</span>
      </div>
      <CheckboxesProvider allElements={imageIds}>
        <ImageCount />
        {campaignImage.length === 0 ? (
          <div className="flex items-center justify-center">
            <span className="text-lg">Chưa có hình ảnh</span>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2">
            {campaignImage.map((i) => (
              <ImageItem image={i} key={i.id} />
            ))}
          </div>
        )}
      </CheckboxesProvider>
    </>
  );
}

export default ImageOperations;
