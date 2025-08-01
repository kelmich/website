import fs from "fs";
import path from "path";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export type BlogNavigationLink = {
  href: string;
};

export const BlogNavigation = ({
  from,
  to,
}: {
  from?: BlogNavigationLink;
  to?: BlogNavigationLink;
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-12">
      {from && <Link href={from.href}>Previous Chapter</Link>}
      {to && <Link href={to.href}>Next Chapter</Link>}
    </div>
  );
};

export default async function BlogPage({
  params,
  children,
}: {
  params: Promise<{ topic: string; chapter: string }>;
  children: React.ReactNode;
}) {
  const { topic, chapter } = await params;

  // path to the content for this topic
  const baseDir = path.join(process.cwd(), "content", "blog", topic);

  const folders = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const index = folders.indexOf(chapter);

  const from =
    index > 0 ? { href: `/blog/${topic}/${folders[index - 1]}` } : undefined;

  const to =
    index < folders.length - 1
      ? { href: `/blog/${topic}/${folders[index + 1]}` }
      : undefined;

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground flex-1">
        <div className="w-full max-w-3xl space-y-4 p-4">
          {children}
          <BlogNavigation from={from} to={to} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
