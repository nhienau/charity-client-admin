import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

function OptimizedImage({ url, className }) {
  // Get version + public ID
  const parts = url.split("/");
  const result = parts.slice(parts.indexOf("upload") + 1).join("/");

  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME },
  });
  const img = cld.image(result).format("auto").quality("auto");

  return <AdvancedImage cldImg={img} className={className} />;
}

export default OptimizedImage;
