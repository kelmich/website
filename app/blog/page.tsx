import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const BlogCard = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) => (
  <Link href={link} className="!no-underline">
    <div className="bg-background border w-full px-2 pb-2">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </Link>
);

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white text-gray-900">
      <Header />

      {/* main content */}
      <main className="flex-1 flex-col bg-secondary text-secondary-foreground p-4">
        <h1>Blog</h1>
        <h3>Read about some stuff I&apos;ve done. </h3>
        <div className="grid grid-cols-3 gap-4 w-full py-4">
          <BlogCard
            title="Flatfalcon"
            description="While searching for a flat I decide to write a better search engine for listings"
            link="/blog/flatfalcon/1-introduction"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
