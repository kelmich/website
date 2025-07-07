import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BlogNavigation } from "@/app/components/BlogNavigation";
import BarChart from "@/app/components/BarChart";
import { queryPerformance } from "@/app/blog/flatfalcon/results";
import { ContractionVisualizer } from "@/app/blog/flatfalcon/5-contraction-hierarchies/ContractionVisualizer";

export default async function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground">
        <div className="w-full max-w-3xl space-y-6 p-4">
          <h1>Chapter 5</h1>
          <h2>Contraction Hierarchies</h2>

          <p>
            Our goal now is to keep query performance as close as possible to
            what we have with full precompute, while reducing the startup and
            memory overhead. One way to achieve this is with Contraction
            Hierarchies.
          </p>

          <p>
            At the core of Contraction Hierarchies is the contraction process.
            It allows us to precompute shortcuts in the graph for later use.
          </p>

          <ContractionVisualizer />

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
              { name: "CHSearcher", time: queryPerformance["CH"] },
            ]}
          />

          <BlogNavigation
            from={{
              title: "Chapter 4",
              description: "Full Precompute",
              href: "/blog/flatfalcon/4-full-precompute",
            }}
            to={{
              title: "Chapter 6",
              description: "Hub Labels",
              href: "/blog/flatfalcon/6-hub-labels",
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
