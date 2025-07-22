import { FullPrecomputeVisualizer } from "./FullPrecomputeVisualizer";
import { FlatfalconBarChart } from "@/content/blog/flatfalcon/results";

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

      <p>
        Consider the following back of the envolope calculation for New York.
        Zillow lists approximately 17000 listings for New York City. The Graph
        of New York City we use for testing is 3.6MB large. So storing the
        entire shortest path for every listing would mean needing 3.6MB * 17000
        = 61&apos;200MB &asymp; 60GB.
      </p>

      <p>
        Note that when running the FullPrecompute setup as a one off task it
        would usually take around 5 minutes to complete. The benchmarking runs
        the setup task 100 times and uses this to calculate the confidence
        intervals. Most likely FullPrecompute was throttled at some point
        (running the entire benchmark took around 24h, mostly due to the
        FullPrecompute setup phase). So this may be somewhat unfair to
        FullPrecompute, but in the end this is what the benchmarking gave us.
        Even at 5min it will be the slowest to setup of all algorithms we will
        examine.
      </p>

      <FlatfalconBarChart
        dataType="Setup"
        algorithms={["Dijkstra", "Dial", "FullPrecompute"]}
      />

      <p>
        What is really nice however is the query performance. We are around
        1000x faster at query time in comparison to our Dial approach. So
        depending on your needs and your tolarance for memory usage this
        approach might very well be a viable option.
      </p>

      <FlatfalconBarChart
        dataType="Query"
        algorithms={["Dijkstra", "Dial", "FullPrecompute"]}
      />

      <p>
        Wether one needs this much fantastic query performance depends on the
        specific use case. While there may be cases where this query is a
        subroutine that is called often and needs to be this fast, our use case
        that simply returns the results over a network does not require this
        level of performance. Keep in mind that most round trip times from a
        user to a server and back will take milliseconds anyway.
      </p>

      <p>
        For the use cases we have in mind we prefer to have more efficient
        startup times and less memory usage. To this end we will explore an
        alternative approach that is somewhat of a middle ground between no
        precompute and full precompute.
      </p>
    </>
  );
}
