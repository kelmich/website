export default async function Home() {
  return (
    <>
      <h1>Chapter 9</h1>
      <h2>Conclusion</h2>
      <p>
        In this work, we explored the problem of filtering real estate listings
        based on exact commute times to a specified destination within a fixed
        time budget. Unlike common radius or isochrone map based methods, our
        approaches compute exact travel time values for all listings that meet
        the time constraint.
      </p>
      <p>
        We adapted and analyzed several shortest path algorithms:
        Dijkstra&apos;s algorithm, Dial&apos;s algorithm, Contraction
        Hierarchies, Hub Labeling, and Full Precomputation. Each method was
        evaluated in terms of query time, preprocessing effort, and memory
        usage, both theoretically and through real world performance benchmarks.
      </p>
      <p>
        Our results show a clear tradeoff between preprocessing cost and query
        speed. Full Precomputation provides the fastest queries, but also
        requires very significant memory and preprocessing time. Hub labels and
        contraction hierarchies also offer very fast queries, though not as fast
        as full precomputation, at a much lower precomputation and memory cost.
        Finally, Dial&apos;s and Dijkstra&apos;s algorithms offer the benefit of
        no required precomputation.
      </p>
      <p>
        The optimal choice of algorithm depends on the application’s
        constraints. These findings provide a practical foundation for
        implementing commute time based filtering in real estate platforms.
      </p>

      {/*<p>Thank you for reading this blog post. I hope you enjoyed it!</p>*/}
    </>
  );
}
