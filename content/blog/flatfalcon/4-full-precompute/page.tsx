import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { FullPrecomputeVisualizer } from "./FullPrecomputeVisualizer";
import BarChart from "@/app/components/BarChart";
import {
  queryPerformance,
  setupPerformance,
  testingMethodologyNotes,
} from "@/content/blog/flatfalcon/results";

export default async function Home() {
  return (
    <>
      <h1>Chapter 4</h1>
      <h2>Precomputing Everything</h2>

      <p>
        What we are really after at the end of the day is raw query performance.
        When it comes to query performance, you can&apos;t do better than simply
        precomputing everything.
      </p>

      <p>
        What is somewhat nice about precomputing everything for our problem is
        that much of the work is parallelizable. We can run a (this time
        regular/ forward) Dijkstra from every listing in parallel and store the
        results in a lookup table of dimension #listings * #graphNodes.
      </p>

      <FullPrecomputeVisualizer />

      <p>
        However, even if we run these shortest path algorithms in parallel, it
        takes quite a while to start up and be ready for the first query. In the
        real world this might be okay, we only need to compute this once and can
        persist the results to disk later for faster startup times. There is
        however also the issue that the memory requirements for scaling this
        approach are non-trivial. Asymptotically it amounts to storing the
        entire graph again for every listing we have.
      </p>

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

      <p>
        What is really nice however is the query performance. We are 1000x
        faster at query time in comparison to our Dial approach. So depending on
        your needs and your tolarance for memory usage this approach might very
        well be a viable option.
      </p>

      <p>
        Consider the following back of the envolope calculation for New York.
        Zillow lists approximately 17000 listings for New York City. The Graph
        of New York City we use for testing is 3.6MB large. So storing the
        entire shortest path for every listing would mean needing 3.6MB * 17000
        = 61'200MB &asymp; 60GB.
      </p>

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
        notes={testingMethodologyNotes}
      />

      <p>
        For the use cases we have in mind we prefer to have more efficient
        startup times and less memory usage. To this end we will explore an
        alternative approach that is somewhat of a middle ground between no
        precompute and full precompute.
      </p>
    </>
  );
}
