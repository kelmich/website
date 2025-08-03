import { InlineCitation } from "@/app/components/Citation";
import {
  ContractionDream,
  ContractionNightmare,
} from "./ContractionHierarchyVisualizer";
import { Abraham2016, FastPaths } from "../references";
import { InlineMath } from "@/app/components/Math";

export default async function Page() {
  return (
    <>
      <h1>Chapter 6</h1>
      <h2>Contraction Hierarchy Theory</h2>
      <p>
        In this chapter, we examine how to determine an effective contraction
        order for the nodes of a graph. A well chosen order minimizes the number
        of shortcut edges introduced during contraction, which in turn reduces
        both query time and memory usage. Excessive shortcut edges increase the
        size of the contracted graph and slow down routing queries, so our goal
        is to keep the number of such edges as small as possible ideally
        maintaining memory usage that is linear in the size of the input graph.
      </p>

      <h3>Worked Example</h3>
      <p>
        The example below illustrates how the contraction order impacts the
        number of shortcut edges. First, consider contracting the graph in the
        order E, D, C, B, A.
      </p>
      <ContractionNightmare />
      <p>
        Contracting node E first leads to the creation of 12 shortcut edges. In
        contrast, reversing the order—contracting A, B, C, D, E, adds no
        shortcuts at all.
      </p>
      <ContractionDream />

      <h3>Highway Dimension</h3>
      <p>
        From a theoretical perspective, analyzing the efficiency of Contraction
        Hierarchies is much more interesting when some limited assumptions about
        the graph can be made. For instance, contraction hierarchies provides no
        asymptotic improvement over classical routing algorithms on dense graphs
        such as the complete graph. However, real-world road networks exhibit
        special structure that contraction hierarchies can exploit. One
        formalization of this structure is the concept of Highway Dimension,
        introduced by <InlineCitation citation={Abraham2016} page={6} />.
      </p>
      <p>
        A graph has highway dimension <InlineMath math="h" /> if, for every
        radius <InlineMath math="r" /> and every vertex <InlineMath math="v" />,
        all shortest paths of length between <InlineMath math="r" /> and{" "}
        <InlineMath math="2r" /> that pass through the ball of radius{" "}
        <InlineMath math="2r" /> centered at <InlineMath math="v" /> can be
        intersected by at most <InlineMath math="h" /> access vertices. These
        access vertices &quot;hit&quot; all such long paths, ensuring coverage
        with a small, localized set.
      </p>

      <h3>
        Theoretical Results for contraction hierarchies with Low Highway
        Dimension
      </h3>
      <p>
        Assuming that the input graph has small highway dimension{" "}
        <InlineMath math="h" />,{" "}
        <InlineCitation citation={Abraham2016} page={12} /> propose a method for
        constructing contraction hierarchies with provable efficiency. They
        introduce sparse path hitting sets (SPHS) at multiple scales. For each
        scale <InlineMath math="r = 2^i" />, a small set of nodes is chosen to
        cover all long paths in their vicinity. These sets are organized into
        hierarchical levels <InlineMath math="Q_i" />, where lower levels
        contain less important nodes that are contracted first.
      </p>
      <p>
        This construction yields the following theoretical guarantees{" "}
        <InlineCitation citation={Abraham2016} page={12} />. Let{" "}
        <InlineMath math="h" /> be the highway dimension of the input graph,{" "}
        <InlineMath math="V" /> be the number of vertices and{" "}
        <InlineMath math="D" /> the diameter of the graph.
      </p>
      <ol>
        <li>
          The total number of edges in the contraction hierarchy is bounded by{" "}
          <InlineMath math="\mathcal{O}(V \cdot h \cdot \log D)" />
        </li>
        <li>
          The degree of any vertex in the contraction hierarchy is bounded by{" "}
          <InlineMath math="h + h \cdot \log D" />.
        </li>
        <li>
          Query time for shortest paths using the contraction hierarchy is{" "}
          <InlineMath math="\mathcal{O}((h \cdot \log D)^2)" />.
        </li>
      </ol>
      <p>
        These results show that, for graphs with small highway dimension,
        contraction hierarchies with efficient overall size exist.
      </p>
      <p>
        Note however that the above bounds rely on being able to compute sparse
        path hitting sets, which is not currently known to be computable in
        polynomial time. If one uses an appaoximation instead (in order to
        compute the contraction hierarchy in polynomial time) the factors change
        as follows <InlineCitation citation={Abraham2016} page={[16, 17]} />:
      </p>
      <ol>
        <li>
          The total number of edges in the contraction hierarchy is bounded by{" "}
          <InlineMath math="\mathcal{O}(V \cdot h \cdot \log h \cdot \log D)" />
        </li>
        <li>
          The degree of any vertex in the contraction hierarchy is bounded by{" "}
          <InlineMath math="h \cdot \log h \cdot \log D" />.
        </li>
        <li>
          Query time for shortest paths using the contraction hierarchy is{" "}
          <InlineMath math="\mathcal{O}((h \cdot \log h \cdot \log D)^2)" />.
        </li>
      </ol>

      <h3>Practical Considerations</h3>
      <p>
        While theoretically sound, constructing SPHS hierarchies is
        computationally expensive, albeit polynomial in <InlineMath math="V" />.
        In practice, heuristic methods are preferred for their efficiency, even
        though they may lack provable guarantees.
      </p>
      <p>
        Our implementation is based on the{" "}
        <InlineCitation citation={FastPaths} /> library, which uses a heuristic
        approach. It assigns each vertex an importance score based on local
        graph structure and connectivity. This method achieves high performance
        in practice and aligns with the observed efficiency of contraction
        hierarchies in real-world road networks.
      </p>
    </>
  );
}
