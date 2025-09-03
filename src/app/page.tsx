import { Auth } from "@/features/auth";
import { RevalidateData } from "@/features/revalidate-data";
import { Blog } from "@/screens/blog";
import { NewsBlog } from "@/widgets/news-block";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}blog`, {
    cache: "force-cache",
  });
  const posts: any[] = await data.json();

  const catsRes = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=REPLACE_ME",
    {
      cache: "force-cache",
      next: {
        tags: ["cats"],
      },
    },
  );

  const cats = await catsRes.json();

  return (
    <div className="p-4">
      <Link href="/atm">go atm</Link>
      <br />
      <br />
      <RevalidateData />
      <br />
      <h3>cars</h3>
      <div className="flex flex-wrap gap-2">
        {cats.map((cat: any) => (
          <div key={cat.id}>
            <Image
              alt="cat"
              src={cat.url}
              width={cat.width / 4}
              height={cat.height / 4}
            />
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(cats, null, 2)}</pre>
      <br />
      <Auth />
      <Blog />
      <NewsBlog />
      <Image alt="globe" src="/globe.svg" width={20} height={20} />
      <br />
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
