import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BlogNavigation } from "@/app/components/BlogNavigation";
import BarChart from "@/app/components/BarChart";
import { setupPerformance } from "@/app/blog/flatfalcon/results";

export default async function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-secondary text-secondary-foreground">
        <div className="w-full max-w-3xl space-y-6 p-4">
          <h1>Chapter 6</h1>
          <h2>Hub Labels</h2>

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
              { name: "CHSearcher", time: setupPerformance["CH"] },
            ]}
          />

          <BlogNavigation
            from={{
              title: "Chapter 5",
              description: "Contraction Hierarchies",
              href: "/blog/flatfalcon/5-contraction-hierarchies",
            }}
            to={{
              title: "Chapter 7",
              description: "Conclusion",
              href: "/blog/flatfalcon/7-conclusion",
            }}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
