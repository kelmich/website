"use client";
import CodeBlock from "@/app/components/CodeBlock";
import Footer from "@/app/components/Footer";
import GraphVisualizer from "@/app/components/GraphVisualizer";
import Header from "@/app/components/Header";
import { use, useEffect, useState } from "react";

export default function Home() {
  const initialGraph = {
    nodes: [
      { id: "A", x: 100, y: 100, style: "fill-blue-500 stroke-blue-200" },
      { id: "B", x: 200, y: 50, style: "fill-green-500 stroke-green-200" },
      { id: "C", x: 200, y: 150, style: "fill-yellow-500 stroke-yellow-200" },
      { id: "D", x: 300, y: 100, style: "fill-purple-500 stroke-purple-200" },
      { id: "E", x: 400, y: 100, style: "fill-pink-500 stroke-pink-200" },
    ],
    edges: [
      { from: "A", to: "B", weight: 5, style: "stroke-blue-400 fill-blue-400" },
      {
        from: "A",
        to: "C",
        weight: 3,
        style: "stroke-green-400 fill-green-400",
      },
      {
        from: "B",
        to: "D",
        weight: 7,
        style: "stroke-yellow-400 fill-yellow-400",
      },
      {
        from: "C",
        to: "D",
        weight: 2,
        style: "stroke-purple-400 fill-purple-400",
      },
      { from: "D", to: "E", weight: 4, style: "stroke-pink-400 fill-pink-400" },
      { from: "A", to: "D", weight: 9, style: "stroke-gray-400 fill-gray-400" },
    ],
  };
  const [graph, setGraph] = useState(initialGraph);

  useEffect(() => {
    // Simulate a graph update after 2 seconds
    const timer = setTimeout(() => {
      setGraph({
        ...initialGraph,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      <main className="flex justify-center bg-primary text-primary-foreground">
        <div className="w-full max-w-3xl space-y-6 p-4">
          <h1>Chapter 2</h1>
          <h2>The Naïve Approach</h2>

          <p>
            The first idea that comes to mind for solving this problem is to run
            a shortest path algorithm (e.g. Dijkstra) from the query point to
            find all sufficiently close listings.
          </p>

          <GraphVisualizer graph={graph} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
