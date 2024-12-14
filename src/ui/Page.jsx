import { TITLE_POSTFIX } from "@/utils/constants";
import { useEffect } from "react";

function Page({ title, children }) {
  useEffect(() => {
    document.title = title ? `${title} - ${TITLE_POSTFIX}` : TITLE_POSTFIX;
  }, [title]);

  return children;
}

export default Page;
