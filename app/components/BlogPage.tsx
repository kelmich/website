import fs from "fs";
import path from "path";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export type BlogNavigationLink = {
  href: string;
  title: string;
};

export type Chapter = {
  name: string;
  href: string;
  number: number;
};

export const BlogNavigation = ({
  chapters,
  currentChapter,
  // topic,
}: {
  chapters: Chapter[];
  currentChapter: string;
  topic: string;
}) => {
  const currentIndex = chapters.findIndex((ch) => ch.name === currentChapter);
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Previous Chapter */}
      <div className="flex-1">
        {previousChapter && (
          <Link
            href={previousChapter.href}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>← Previous</span>
          </Link>
        )}
      </div>

      {/* Chapter Links */}
      <div className="hidden sm:flex flex-wrap items-center justify-center gap-2">
        {chapters.map((chapter) => (
          <a
            key={chapter.name}
            href={chapter.href}
            className={`
              px-3 py-2 text-sm font-medium
              ${chapter.name === currentChapter ? "underline" : ""}
            `}
          >
            {chapter.number}
          </a>
        ))}
      </div>

      {/* Next Chapter */}
      <div className="flex-1 text-right">
        {nextChapter && (
          <Link
            href={nextChapter.href}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Next →</span>
          </Link>
        )}
      </div>
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

  // Path to the content for this topic
  const baseDir = path.join(process.cwd(), "content", "blog", topic);
  const folders = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  // Create chapters array with proper numbering
  const chapters: Chapter[] = folders.map((folderName, index) => ({
    name: folderName,
    href: `/blog/${topic}/${folderName}`,
    number: index + 1,
  }));

  return (
    <div className="flex flex-col w-screen min-h-screen blog">
      <Header />
      <main className="flex justify-center bg-secondary text-secondary-foreground flex-1">
        <div className="w-full max-w-3xl space-y-4 p-4">
          {children}
          <BlogNavigation
            chapters={chapters}
            currentChapter={chapter}
            topic={topic}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
