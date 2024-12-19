import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `
  *[_type == "blog"] | order(_createdAt asc) {
  title,
    description,
    "currentSlug": slug.current,
    titleImage
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  console.log(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5">
      {data.map((post) => (
        <CardContainer key={post.currentSlug}>
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
            <CardItem translateZ="100" className="w-full mt-4">
              <Image
                src={urlFor(post.titleImage).url()}
                alt="thumbnail"
                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                width={400}
                // width="1000"
                height={400}
                // height="1000"
              />
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-2xl font-bold my-4 line-clamp-2"
            >
              {post.title}
            </CardItem>
            <CardItem as="p" translateZ="60" className="text-lg line-clamp-3">
              {post.description}
            </CardItem>
            <div className="flex justify-between items-center mt-10">
              <div></div>
              <CardItem as="button" translateZ="60" className="text-blue-500">
                <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      ))}
    </div>
  );
}
