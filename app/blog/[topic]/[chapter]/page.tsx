import path from "path";
import fs from "fs";
import BlogPage from "@/app/components/BlogPage";

const contentBaseDir = path.join(process.cwd(), "content", "blog");

export async function generateStaticParams() {
    const topics = fs
        .readdirSync(contentBaseDir, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => d.name);

    const params: { topic: string; chapter: string }[] = [];

    topics.forEach((topic) => {
        const chapters = fs
            .readdirSync(path.join(contentBaseDir, topic), { withFileTypes: true })
            .filter((d) => d.isDirectory())
            .map((d) => ({ topic, chapter: d.name }));

        params.push(...chapters);
    });

    return params;
}

export default async function Page({
    params,
}: {
    params: Promise<{ topic: string; chapter: string }>;
}) {

    const { topic, chapter } = await params;

    const mod = await import(`@/content/blog/${topic}/${chapter}/page.tsx`);
    const ChapterContent = mod.default;

    return (
        <BlogPage
            params={params}
        >
            <ChapterContent />
        </BlogPage>
    );
}
