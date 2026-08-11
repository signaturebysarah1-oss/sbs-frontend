import CustomPage from "@/views/custom/Index";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={null}><CustomPage /></Suspense>
  );
};

export default page;
