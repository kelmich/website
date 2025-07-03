import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { DijkstraVisualizer } from "@/app/blog/flatfalcon/2-dijkstra/DijkstraVisualizer";
import CodeBlock from "@/app/components/CodeBlock";
import { BlogNavigation } from "@/app/components/BlogNavigation";

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

          <p>
            Admittedly, some small tweaks need to be made for our use case.
            We will start exploring from the node the user submits. As we are curious
            about the distance <b>from</b> a listing <b>to</b> the query point, we will
            explore incoming edges from the visited node as opposed to the usual outgoing edges.
          </p>

          <p>
            Below you can see an example implementation of Dijkstra in TypeScript.
            You can also see what the code does on a small example by clicking through the interactive
            visualization below the code snippet.
          </p>

          <CodeBlock
            lang="ts"
            filepath="./app/blog/flatfalcon/2-dijkstra/dijkstra.ts"
          />

          <DijkstraVisualizer />

          <p>
            This algorithm solves our problem. But what does it cost to run? The theoretical
            worst case complexity of Dijkstra is
            O((V + E) log V), where V is the number of
            vertices and E is the number of edges in the graph. More specialized implementations exist
            that use Fibonacci heaps to achieve a complexity of O(E + V log V).
          </p>

          <p>
            The issue with this is that the complexity is largely independant of the number of listings
            we find, but very depenent on the graph structure itself. If a user is looking for listings
            in the middle of nowhere and we have none nearby we may spend a lot of time exploring
            portions of the graph that we already know will contain no listings.
          </p>

          <p>
            Another issue is that Min Heaps are actually somewhat suboptimal for this use case.
            More on that in Chapter 3
          </p>

          <BlogNavigation
            from={{
              title: "Chapter 1",
              description: "Introduction",
              href: "/blog/flatfalcon/1-introduction",
            }}
            to={{
              title: "Chapter 3",
              description: "Better than Dijkstra",
              href: "/blog/flatfalcon/3-dial",
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
