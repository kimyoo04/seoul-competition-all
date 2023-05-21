import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import EducationDetail from "@scenes/Educations/EducationDetail";

export default function EducationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <EducationDetail id={id} />
      </DetailPageLayout>
    );
  }
}
