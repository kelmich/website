import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <>
      <h1>Chapter 1</h1>
      <h2>Introduction</h2>
      <p>
        It all started last year when I was looking for a flat in Zurich. I had
        multiple requirements. Most were basic and supported by most listing
        websites, like appartment size and rent price. However many had no or
        only poor support for filtering appartments that were too far away from
        where I would be commuting to frequently. I would run the following
        procedure anytime I rechecked if any new promising listings had appeared
        since the last time I checked. In Typescript it would be something like
        this:
      </p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/1-introduction/workflow.ts"
      />
      <p>
        As every performance driven developer knows: Slow inner loops are
        dangerous. I would end up spending most of my time on google maps trying
        to determine if an otherwise promising flat was anywhere close to where
        I wanted to be.
      </p>
      <p>
        The solution offered by the platform I used most often was not
        satisfactory. In general the following solutions exist:
      </p>
      <ol>
        <li>Filter By Zip Code</li>
        <li>Draw a region on a map you are interested in</li>
        <li>
          Precompute the region of interest using dijkstra and then filter for
          listings being contained inside the computed region (Isochrone Maps)
        </li>
      </ol>
      <p>
        The first method is clearly suboptimal. Requiring users to determine the
        relevant zip codes on their own is highly inconvenient. It&apos;s likely
        that the selected set of zip codes would encompass a broader area than
        actually desired, leading to imprecise results. This approach is
        inefficient and user-unfriendly.
      </p>
      <p>
        The second method shares many of the same shortcomings. How is the user
        supposed to know what their region of interest should be? There could be
        a nearby highway that makes a distant area surprisingly accessible.
        Additionally, users have to draw this region on a map, which feels
        cumbersome.
      </p>
      <p>
        The third method is comparatively reasonable. It attempts to answer the
        question, &quot;What is the user&apos;s region of interest?&quot; by
        performing a Dijkstra search from the query point to calculate all areas
        reachable within a specified time budget.{" "}
        <a
          href="https://www.newhome.ch"
          rel="noopener noreferrer"
          target="_blank"
        >
          Newhome
        </a>{" "}
        implements a version of this approach. However, even this method has two
        notable limitations.
      </p>

      <ol>
        <li>
          We don&apos;t know how far away an individual listing is, only that
          it&apos;s within our time budget. Users might want to sort the results
          by closeness to their query location.
        </li>
        <li>
          Possibly inefficient. The computed region may be arbitrarily complex,
          making determining what points are inside it inefficient.
        </li>
      </ol>
    </>
  );
}
