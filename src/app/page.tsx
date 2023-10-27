import CardList from "@/components/post/CardList";
import getPostMetadata from "@/libs/getPostMetadata";

export default function Home() {
  const postMetadata = getPostMetadata();
  return <CardList list={postMetadata} />;
}
