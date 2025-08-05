import { InlineCitation } from "@/app/components/Citation";
import { InlineMath, DisplayMath } from "@/app/components/Math";
import { Allen2018 } from "../references";

export default function ProjectProposal() {
  return (
    <>
      <h1>Chapter 1</h1>
      <h2>Abstract</h2>
      <p>
        Commute time is a critical but underrepresented factor in online real
        estate search platforms. While existing systems offer location based
        filtering via radius constraints or isochrone maps, they fail to provide
        exact travel times for individual listings. We address this gap by
        introducing efficient algorithms to compute and filter real estate
        listings based on exact commute times to a given destination within a
        specified time budget. Formally, we model the road network as a weighted
        graph and aim to compute, for a query point and time budget, all
        listings that are reachable along the fastest paths, along with their
        precise travel times. We adapt and evaluate a range of shortest path
        algorithms: Dijkstra&apos;s algorithm, Dial&apos;s algorithm, full
        precomputation, Contraction Hierarchies, and Hub Labeling, to this use
        case. Each method is analyzed both theoretically in terms of runtime and
        memory requirements, and empirically through real world benchmarks on
        urban road network data. Our results highlight tradeoffs between
        preprocessing time, query efficiency, and memory usage, and demonstrate
        practical strategies for enabling commute time based filtering at
        interactive speeds in real estate platforms.
      </p>
      <h2>Motivation</h2>
      <p>
        Online platforms for renting apartments or purchasing houses typically
        provide numerous filtering options based on criteria such as price,
        size, number of rooms, and location. However, one critical aspect often
        overlooked is the ability to filter properties based on commute time to
        a specific location, such as a workplace or a university.
      </p>
      <p>
        For many individuals, commute time is a decisive factor in choosing a
        residence. The absence of this feature forces users to manually estimate
        or calculate commute times for each property, which is both inefficient
        and error prone.
      </p>
      <p>
        Given the increasing availability of geospatial and transportation data,
        incorporating commute time based filtering could greatly enhance user
        experience and decision making. Despite its clear utility, no satisfying
        solution exists that supports efficient filtering by commute time in an
        online setting.
      </p>
      <h2>Related Work</h2>
      <p>
        There are generally two popular methods currently used to estimate
        commute times. Both methods work by first determining a geometric object
        that represents the users interested search area over the map and then
        filtering objects based on their inclusion in the search area.
      </p>
      <ol className="space-y-6">
        <li>
          <b>Radius Based Filtering:</b>
          <a
            href="https://flatfox.ch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flatfox
          </a>{" "}
          uses a radius based approach to filter locations based on the user's
          desired radius of interest. A user sets a starting point and a radius,
          and the system filters locations within that radius. This method is
          intuitive and easy to use, but as can be seen by the next method, it
          may not be accurate for all types of locations.
          <img
            src="/flatfalcon/1/flatfox-location-filtering.png"
            alt="Flatfox Radius based location filtering"
            className="py-2"
          />
        </li>
        <li>
          <b>Isochrone Maps:</b>
          <a
            href="https://newhome.ch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Newhome
          </a>{" "}
          precomputes all regions of the map that are reachable within a certain
          time from a given point. This method, commonly referred to as
          isochrone maps <InlineCitation citation={Allen2018} page={2} />, is
          more accurate than radius based filtering, as it takes into account
          the actual travel time between locations. As can be seen in the image
          below, the isochrone map provides a more accurate representation of
          the reachable areas compared to the radius based filtering.
          <img
            src="/flatfalcon/1/newhome-location-filtering.png"
            alt="Newhome Isochrone Map based location filtering"
            className="py-2"
          />
        </li>
      </ol>
      <p>
        Both of these approaches have a common problem. While it is possible to
        filter based on the commute time, there is no way of knowing the exact
        time it will take to reach a listing. One can only know that the travel
        time will be within a certain range. While this is helpful, a potential
        appartment that is only 5min away might be considerably more interesting
        than one that is 25min away, even if both are within the permissible
        range.
      </p>
      <p>
        Further the more complex the geometric shape of the area, the more
        computationally expensive it becomes to determine if a location is
        within the object's boundaries. Consider also that there may be holes
        within the object's boundaries.
      </p>
      <h2>Problem Definition</h2> <p>Given the following inputs:</p>{" "}
      <ul>
        {" "}
        <li>
          {" "}
          A weighted graph <InlineMath math="G = (V, E, w)" /> defined as:{" "}
          <ul>
            {" "}
            <li>
              {" "}
              <InlineMath math="V" /> is the set of vertices. Each{" "}
              <InlineMath math="v \in V" /> represents one of the following:{" "}
              <ul>
                {" "}
                <li>a road intersection,</li>
                {/*<li>a dead end,</li>*/}
                <li>or a listing location,</li>
              </ul>{" "}
            </li>{" "}
            <li>
              {" "}
              <InlineMath math="E" /> is the set of edges, where each{" "}
              <InlineMath math="e = (u, v) \in E" /> connects two vertices{" "}
              <InlineMath math="u, v \in V" /> and represents a road
              segment.{" "}
            </li>{" "}
            <li>
              {" "}
              <InlineMath math="w: E \to \mathbb{N}_0" /> is a weight function
              where <InlineMath math="w(e)" /> denotes the travel time in
              seconds to traverse edge <InlineMath math="e" />.{" "}
            </li>{" "}
          </ul>{" "}
        </li>{" "}
        <li>
          {" "}
          A query point <InlineMath math="q \in V" /> representing the commute
          destination (e.g., workplace).{" "}
        </li>{" "}
        <li>
          {" "}
          A finite set <InlineMath math="L \subseteq V" /> representing the
          locations of apartments or houses on offer (listings).{" "}
        </li>{" "}
        <li>
          {" "}
          A travel time function{" "}
          <InlineMath math="t: V \times V \to \mathbb{N}_0" /> defined as:{" "}
          <DisplayMath
            math={`t(x, y) := \\min_{r: x \\to y} \\sum_{e \\in r} w(e)`}
          />{" "}
          <p>
            {" "}
            where the minimum is taken over all paths <InlineMath math="r" />{" "}
            from <InlineMath math="x" /> to <InlineMath math="y" /> in the graph{" "}
            <InlineMath math="G" />.{" "}
          </p>{" "}
        </li>{" "}
        <li>
          {" "}
          A time budget <InlineMath math="B \in \mathbb{N}_0" /> specifying the
          maximum allowed commute time in seconds.{" "}
        </li>{" "}
      </ul>{" "}
      <p>
        The goal is to compute the set of pairs <InlineMath math="S" />, where:
      </p>{" "}
      <DisplayMath
        math={`S := \\left\\{\\, (l,\\ t(l, q))\\; \\middle| \\;
        \\begin{aligned}
          &l \\in L, \\\\
          &t(l, q) \\leq B
        \\end{aligned}
        \\right\\}`}
      />
      <p>
        {" "}
        In other words: For each listing location <InlineMath math="l \in L" />{" "}
        that can reach the query point <InlineMath math="q" /> within the time
        budget <InlineMath math="B" />, compute both the listing{" "}
        <InlineMath math="l" /> and the travel time{" "}
        <InlineMath math="t(l, q)" />.{" "}
      </p>
    </>
  );
}
