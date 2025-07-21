import { ContractionVisualizer } from "@/content/blog/flatfalcon/5-contraction-hierarchies-introduction/ContractionVisualizer";
import CodeBlock from "@/app/components/CodeBlock";
import { ContractionHierarchyVisualizer } from "./ContractionHierarchyVisualizer";
import { ContractedGraph, ContractedUpDownGraph } from "./ContractedGraph";

export default async function Home() {
  return (
    <>
      <h1>Chapter 5</h1>
      <h2>Contraction Hierarchies Introduction</h2>

      <p>
        Our goal now is to keep query performance as close as possible to what
        we have with full precompute, while reducing the startup and memory
        overhead. One way to achieve this is with Contraction Hierarchies.
      </p>

      <p>
        Contraction Hierarchies are not as simple to explain as our previous
        approaches. For this reason we will first look at their intended use
        case of point to point routing and not our listing query problem.
      </p>

      <p>
        The high level idea is that we want to precompute commonly used
        shortcuts in our graph. What are &quot;commonly used shortcuts&quot;
        though? We will give this more theortical backing later, but for now
        consider the following: Usually when you use a road network you go from
        a vertex that isn&apos;t contained in many shortest paths (e.g. your
        house), to a vertex that is contained in many shortest paths (e.g. entry
        to a highway), to a vertex that isn&apos;t contained in many shortest
        paths again (e.g. your workplace). By precomputing a shortcut from your
        house to the highway entry point, and from the highway entry point to
        your workplace, we can significantly reduce the number of edges we need
        to traverse during a query.
      </p>

      <p>
        Assume now that we created a total order of the nodes in our graph,
        going from least important to most important. In our working example
        this order will be alphabetical: A, B, C, D, and E.
      </p>

      <p>
        We now have enough intuition to take a first look at the core part of
        Contraction Hierarchies: The contraction process. It allows us to
        precompute shortcuts in the graph for later use. Below you can find an
        example where we contract a single node. This is the bilding block we
        will use to create our efficient query datastructure.
      </p>

      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/5-contraction-hierarchies-introduction/contractor.ts"
      />

      <p>Below you can see the result of contracting the vertex C.</p>

      <ContractionVisualizer />

      <p>
        Alright, but how does this contraction process help us? What we could do
        is iteratively contract the nodes from least to most important. Remember
        that in our example Graph we said this order is alphabetical: A, B, C,
        D, E.
      </p>

      <ContractionHierarchyVisualizer />

      <p>
        Once the contraction process completes we have an empty graph. This by
        itself is not very helpful. Let&apos;s however take a look at the
        original graph alongside the additional shortcut edges that were
        created.
      </p>

      <ContractedGraph />

      <p>The observant reader will notice the following key facts:</p>
      <ol>
        <li>
          We can travel to any higher ranked node by visiting only{" "}
          <b>increasingly higher ranked nodes</b> at the same optimal travel
          time as in the graph without shortcuts.
        </li>
        <li>
          We can travel to any lower ranked node by visiting only{" "}
          <b>increasingly lower ranked nodes</b> at the same optimal travel time
          as in the graph without shortcuts.
        </li>
      </ol>
      <p>
        The core statement here is that we can optimally travel between any two
        vertices by first only visiting increasingly important vertices and then
        decreasingly less important vertices. We can even split our graph into
        an up DAG and a down DAG.
      </p>

      <ContractedUpDownGraph />

      <p>
        To navigate between any two vertices optimally we can now run any
        shortest path finding algorithm from the source (using outgoing edges)
        in the up graph and the target (using incoming edges) in the down graph.
        When the two processes meet we have found a shortest path. Note that the
        processes must meet at some point, because some node on the shortest
        path must have the highest assigned importance in our order.
      </p>

      <p>
        Using this technique point to point shortest path queries can take{" "}
        <a
          href="https://github.com/easbar/fast_paths/"
          target="_blank"
          rel="noopener noreferrer"
        >
          as little as 0.026ms
        </a>{" "}
        on average in our New York City graph.
      </p>

      <p>Now two questions remain:</p>
      <ol>
        <li>How do we determine a good order to contract our nodes?</li>
        <li>How can we use this method for our Listing Query problem?</li>
      </ol>
    </>
  );
}
