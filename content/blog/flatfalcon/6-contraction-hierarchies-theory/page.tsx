import {
  ContractionDream,
  ContractionNightmare,
} from "./ContractionHierarchyVisualizer";

export default async function Page() {
  return (
    <>
      <h1>Chapter 6</h1>
      <h2>Contraction Hierarchy Theory</h2>
      <p>
        We will now discuss the interesting topic of picking a good contraction
        order for the nodes in our graph. What even is a good order? The issue
        we want to avoid is an exploding amount of shortcut edges. Consider the
        following example:
      </p>
      <ContractionNightmare />
      <p>
        By picking E as our lowest priority node we created 12 additional
        shortcut edges. If we by contrast pick E as the last vertex to contract
        (i.e. highest priority) we add zero additional edges.
      </p>
      <ContractionDream />
      <p>
        While creating shortcuts is not a bad thing, we need to ensure there are
        not too many of them. Otherwise our routing algorithms will have to
        process so many edges that they would be inefficient even if the routing
        were done in linear time.
      </p>
      <p>
        The core problem we have for theoretical bounds essentially boils down
        to this: What if we have the complete graph? Most optimizations one
        tries will not outperform classic routing algorithms from a theoretical
        perspective in that case. However: If we introduce some constraints on
        the types of graphs we consider, the effects of our optimizations that
        we also see in the real world become visible in the theoretical bounds.
        We will assume a hypothesis introduced by{" "}
        <a
          href="https://www.microsoft.com/en-us/research/wp-content/uploads/2013/09/tr-msr-2013-91-rev.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abraham, Delling, Fiat, Goldberg, and Werneck
        </a>
        . They define the concept of Highway Dimension:
      </p>
      <p>
        Formally, a graph has highway dimension h if, for every radius r and
        every vertex v, all long shortest paths within distance 2r of v (but
        longer than r) pass through at most h &quot;access vertices.&quot; These
        access vertices effectively &quot;hit&quot; all those paths.
      </p>
      <p>
        If we assume that our road network has a small highway dimension h, then
        our contraction hierarchies algorithm can achieve significant speedups
        over classic routing algorithms.
      </p>
      <p>
        The paper shows that if a graph has low highway dimension, one can use
        it to derive a multiscale hierarchy of important nodes, from which you
        can build an ordering for contraction hierarchies. The authors define a
        construct called a multiscale sparse path hitting set (SPHS). At each
        scale r=2^i, they select a small set of nodes that &quot;cover&quot; all
        long paths nearby. By stacking these sets from coarsest to finest
        scales, they define levels Q_i, and order the nodes so that lower-level
        (less important) nodes are contracted before higher-level ones. The
        result:
      </p>
      <ol>
        <li>
          The number of shortcuts added is provably small: 𝑂(n * h * log D),
          where D is the graph diameter.
        </li>
        <li>The maximum degree in the final augmented graph is bounded.</li>
        <li>CH queries on such a graph run in O((h * log D)^2) time.</li>
      </ol>
      <p>
        This is a provable guarantee that CH will be fast—assuming low highway
        dimension.
      </p>
      <p>
        Unfortunately constructing the hierarchy in this manner is
        computationally quite expensive (however still polynomial in the graph
        size). So expensive in fact that our previous &quot;Precomputing
        Everything&quot; approach is more efficient. For this reason most
        implementations use heuristics and forego the theoretical guarantees of
        the algorithm. However, the theorem provides a solid foundation for
        understanding why Contraction Hierarchies are so effective.
      </p>
      <p>
        We will build on the contraction hierarchy from{" "}
        <a
          href="https://github.com/easbar/fast_paths"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://github.com/easbar/fast_paths
        </a>{" "}
        . They use a heuristic approach to construct the hierarchy, which is
        more efficient than the theoretical construction but may not provide the
        same guarantees. The heuristic approach computes an importance score for
        each vertex and uses this score to guide the construction of the
        hierarchy.
      </p>
    </>
  );
}
