import CodeBlock from "@/app/components/CodeBlock";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { DijkstraVisualizer } from "./DijkstraVisualizer";

export default async function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground">
        <div className="w-full max-w-3xl space-y-6 p-4">
          <h1>Chapter 2</h1>
          <h2>The Naïve Approach</h2>

          <p>
            The first idea that comes to mind for solving this problem is to run
            a shortest path algorithm (e.g. Dijkstra) from the query point to
            find all sufficiently close listings.
          </p>

          <DijkstraVisualizer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
