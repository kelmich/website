import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BlogNavigation } from "@/app/components/BlogNavigation";
import { FullPrecomputeVisualizer } from "./FullPrecomputeVisualizer";

export default async function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground">
        <div className="w-full max-w-3xl space-y-6 p-4">
          <h1>Chapter 4</h1>
          <h2>Precomputing Everything</h2>

          <p>
            What we are really after at the end of the day is raw query performance.
            When it comes to query performance, you can't do better than simply precomputing everything.
          </p>

          <p>
            What is somewhat nice about precomputing everything for our problem is that much of the work is
            parallelizable. We can run a (this time regular/ forward) Dijkstra from every listing in parallel and store the
            results in a lookup table of dimension #listings * #graphNodes.
          </p>

          <FullPrecomputeVisualizer />




          <BlogNavigation
            from={{
              title: "Chapter 3",
              description: "Dial's Algorithm",
              href: "/blog/flatfalcon/3-dial",
            }}
            to={{
              title: "Chapter 5",
              description: "Contraction Hierarchies",
              href: "/blog/flatfalcon/5-contraction-hierarchies",
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
