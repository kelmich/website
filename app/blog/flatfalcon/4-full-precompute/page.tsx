import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import CodeBlock from "@/app/components/CodeBlock";
import { BlogNavigation } from "@/app/components/BlogNavigation";

export default async function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground">
        <div className="w-full max-w-3xl space-y-6 p-4">
          <h1>Chapter 4</h1>
          <h2>Precomputing Everything</h2>

          <p>
            Dial's Algorithm doesn't really address any of the core issues we had with Dijkstra,
            but it's quite a neat optimization and quite a bit faster for basically free,
            which is why I want to show it to you.
          </p>

          <p>
            The core insight is that our users will realistically only care about listings
            that are within a certain distance from the query point. Nobody wants to live 10h
            from where they work. We can use this to our advantage and, instead of using a
            Min Heap to store the nodes we want to visit next, we can use a simple array
            of buckets, where each bucket corresponds to a distance from the query point.
            We can then simply iterate through the buckets in order, visiting all nodes
            that are within the distance of the current bucket.
          </p>

          <p>
            An example implementation in TypeScript can be found below.
          </p>


          <CodeBlock
            lang="ts"
            filepath="./app/blog/flatfalcon/3-dial/dial.ts"
          />
          <p>
            How does this compare asymptotically to Dijkstra? The theoretical worst case complexity is
            O(E + V + B), where E is the number of edges, V is the number of vertices in the graph and
            B the &quot;Maximum Query Budget&quot;.
            This is because we only visit each node once and we only visit each edge once.
            Further we visit every bucket at most once. This is a significant improvement over Dijkstra, which has a complexity of O(E + V log V) in the worst case.
          </p>


          <BlogNavigation
            from={{
              title: "Chapter 2",
              description: "Dijkstra Attempt",
              href: "/blog/flatfalcon/2-dijkstra",
            }}
            to={{
              title: "Chapter 4",
              description: "Ultimate Speed",
              href: "/blog/flatfalcon/3-dial",
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
