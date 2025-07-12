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
        shortcut edges. If we by contrast pick E as the last vertex we add zero
        additional edges.
      </p>
      <ContractionDream />
      <p>
        While creating shortcuts is not a bad thing, we need to ensure there are
        not too many of them. Otherwise our routing algorithms will have to
        process so many edges that they would be inefficient even if the routing
        were done in linear time.
      </p>
    </>
  );
}
