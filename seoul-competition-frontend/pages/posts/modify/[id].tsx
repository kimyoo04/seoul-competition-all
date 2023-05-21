import OnePageLayout from "@layouts/OnePageLayout";
import EditPost from "@scenes/Posts/EditPost";
import { useRouter } from "next/router";

export default function UpdatePostPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <OnePageLayout>
        <EditPost id={id} />
      </OnePageLayout>
    );
  }
}
