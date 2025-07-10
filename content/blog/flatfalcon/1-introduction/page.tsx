import CodeBlock from "@/app/components/CodeBlock";

export default function Page() {
  return (
    <>
      <h1>Chapter 1</h1>
      <h2>Introduction</h2>
      <p>
        It all started last year when I was looking for a flat in Zurich. I
        had multiple requirements. Most were basic and supported by most
        listing websites, like appartment size and rent price. However many
        had no or only poor support for filtering appartments that were too
        far away from where I would be commuting to frequently. I would run
        the following procedure anytime I rechecked if any new promising
        listings had appeared since the last time I checked. In Typescript it
        would be something like this:
      </p>
      <CodeBlock
        lang="ts"
        filepath="./content/blog/flatfalcon/1-introduction/workflow.ts"
      />
      <p>
        As every performance driven developer knows: It&apos;s those pesky
        inner loops you have to watch out for. I would end up spending most
        of my time on google maps trying to determine if an otherwise
        promising flat was anywhere close to where I wanted to be.
      </p>
      <p>
        The solution offered by the platform I used most often was not
        satisfactory. In general the following solutions exist:
      </p>
      <ol>
        <li>Filter By Zip Code</li>
        <li>Draw a region on a map you are interested in</li>
        <li>
          Precompute the region of interest using dijkstra and then filter
          for listings being contained inside the computed region (Isochrone
          Maps)
        </li>
      </ol>
      <p>
        The first method is obviously terrible. You&apos;re going to force
        me to go figure out the relevant zip codes on my own? Most likely my
        set of zip codes will cover more area than the result set I really
        would want to cover. Horrible.
      </p>
      <p>
        The second method suffers from many of the same problems. How do I
        even know what my region of interest is? There might be some fast
        highway that makes some far away patch of land from my point of
        interest a relevant region. How would I know? And I need to draw
        this with my fatty finger? Pass.
      </p>
      <p>
        The third method is actually somewhat reasonable. Essentially the
        idea is to answer the question &quot;What is the region of
        interest&quot; for the user. We run a dijkstra search from the
        given query point and compute all reachable area within our time
        budget. <a href="https://www.newhome.ch">Newhome</a> does a version
        of this. This method still has two drawbacks though.
      </p>
      <ol>
        <li>
          We don&apos;t know how far away an individual listing is, only
          that it&apos;s within our time budget.
        </li>
        <li>
          Possibly inefficient. The computed region may be arbitrarily
          complex, making determining what points are inside it inefficient.
        </li>
      </ol>
    </>
  );
}
