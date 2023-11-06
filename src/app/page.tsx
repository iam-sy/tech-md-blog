import CardList from "@/components/post/CardList";
import getPostMetadata from "@/libs/getPostMetadata";
import DefaultLayout from "@/components/layout/DefaultLayout";

export default function Home() {
  const postMetadata = getPostMetadata();
  return (
    <DefaultLayout>
      <CardList list={postMetadata} />
    </DefaultLayout>
  );
}
