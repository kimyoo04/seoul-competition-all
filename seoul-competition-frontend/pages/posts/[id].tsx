import { useRouter } from "next/router";
import DetailPageLayout from "@layouts/DetailPageLayout";
import PostDetail from "@scenes/Posts/postDetail";

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id === "string") {
    return (
      <DetailPageLayout>
        <PostDetail id={id} />
      </DetailPageLayout>
    );
  }
}
