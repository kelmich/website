import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BlogNavigation } from "@/app/components/BlogNavigation";
import { FullPrecomputeVisualizer } from "./FullPrecomputeVisualizer";
import BarChart from "@/app/components/BarChart";
import {
  queryPerformance,
  setupPerformance,
} from "@/app/blog/flatfalcon/results";

export default async function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground">
        <div className="w-full max-w-3xl space-y-6 p-4">
          <h1>Chapter 4</h1>
          <h2>Precomputing Everything</h2>

          <p>
            What we are really after at the end of the day is raw query
            performance. When it comes to query performance, you can&apos;t do
            better than simply precomputing everything.
          </p>

          <p>
            What is somewhat nice about precomputing everything for our problem
            is that much of the work is parallelizable. We can run a (this time
            regular/ forward) Dijkstra from every listing in parallel and store
            the results in a lookup table of dimension #listings * #graphNodes.
          </p>

          <FullPrecomputeVisualizer />

          <BarChart
            unit="s"
            title="Precomputation Time (NYC)"
            bars={[
              { name: "DijkstraSearcher", time: setupPerformance["Dijkstra"] },
              { name: "DialSearcher", time: setupPerformance["Dial"] },
              {
                name: "SmartStupidSearcher",
                time: setupPerformance["SmartStupid"],
              },
            ]}
          />

          <BarChart
            unit="ms"
            title="Average Query Time (NYC)"
            bars={[
              { name: "DijkstraSearcher", time: queryPerformance["Dijkstra"] },
              { name: "DialSearcher", time: queryPerformance["Dial"] },
              {
                name: "SmartStupidSearcher",
                time: queryPerformance["SmartStupid"],
              },
            ]}
          />

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
