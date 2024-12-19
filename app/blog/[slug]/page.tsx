import { blogArticle } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
  "currentSlug": slug.current,
    title,
    content,
    titleImage
}[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: blogArticle = await getData(params.slug);
  return (
    <div className="mt-8">
      <h1 className="text-center font-semibold tracking-wide uppercase">
        Mike Jerry - <span className="text-primary">Blog</span>
      </h1>
      <span className="block mt-5 text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
        {data.title}
      </span>

      <div className="flex justify-center mt-12">
        <Image
          src={urlFor(data.titleImage).url()}
          width={800}
          height={800}
          alt="thumbnail"
          priority
          className="rounded-lg max-h-svh max-w-svh object-cover border"
        />
      </div>

      <div className="mt-16 prose prose-lg prose-blue dark:prose-invert">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}
