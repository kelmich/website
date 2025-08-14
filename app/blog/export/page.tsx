import fs from "fs";
import path from "path";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ topic: string; chapter: string }>;
  children: React.ReactNode;
}) {
  const { topic } = await params;

  // path to the content for this topic
  const baseDir = path.join(process.cwd(), "content", "blog", topic);

  const folders = fs
    .readdirSync(baseDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  // Dynamically import all chapters' content components
  const chaptersContent = await Promise.all(
    folders.map(async (chapter) => {
      // Assumes each chapter has an index.tsx file as the entry point
      // Adjust the import path as needed for your project structure
      const ChapterModule = await import(
        `@/content/blog/${topic}/${chapter}/page.tsx`
      );
      const ChapterComponent = ChapterModule.default;
      return (
        <div key={chapter} className="mb-12">
          <ChapterComponent />
        </div>
      );
    }),
  );

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground flex-1">
        <div className="w-full max-w-3xl space-y-4 p-4">{chaptersContent}</div>
      </main>

      <Footer />
    </div>
  );
}
