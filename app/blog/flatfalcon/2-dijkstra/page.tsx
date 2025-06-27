"use client";
import CodeBlock from "@/app/components/CodeBlock";
import Footer from "@/app/components/Footer";
import GraphVisualizer from "@/app/components/GraphVisualizer";
import Header from "@/app/components/Header";
import { use, useEffect, useState } from "react";

export default function Home() {
    
const initialGraph = {
  nodes: [
    { id: 'A', x: 50, y: 100, color: '#00FFAA' },
    { id: 'B', x: 200, y: 50, color: '#00FFAA' },
    { id: 'C', x: 350, y: 100, color: '#00FFAA' },
    { id: 'D', x: 100, y: 200, color: '#00FFAA' },
    { id: 'E', x: 250, y: 200, color: '#00FFAA' },
  ],
  edges: [
    { from: 'A', to: 'B', weight: 4, color: '#00FFAA' },
    { from: 'A', to: 'D', weight: 2, color: '#00FFAA' },
    { from: 'B', to: 'D', weight: 1, color: '#00FFAA' },
    { from: 'B', to: 'E', weight: 1, color: '#00FFAA' },
    { from: 'B', to: 'C', weight: 3, color: '#00FFAA' },
    { from: 'E', to: 'C', weight: 2, color: '#00FFAA' },
  ],
};
const [graph, setGraph] = useState(initialGraph);

useEffect(() => {
  // Simulate a graph update after 2 seconds
  const timer = setTimeout(() => {
    setGraph({
        nodes: [
            { id: 'A', x: 50, y: 100, color: '#FF0000' },
            { id: 'B', x: 200, y: 50, color: '#FF0000' },
            { id: 'C', x: 350, y: 100, color: '#FF0000' },
            { id: 'D', x: 100, y: 200, color: '#FF0000' },
            { id: 'E', x: 250, y: 200, color: '#FF0000' },
        ],
        edges: [
            { from: 'A', to: 'B', weight: 4, color: '#FF0000' },
            { from: 'A', to: 'D', weight: 2, color: '#FF0000' },
            { from: 'B', to: 'D', weight: 1, color: '#FF0000' },
            { from: 'B', to: 'E', weight: 1, color: '#FF0000' },
            { from: 'B', to: 'C', weight: 3, color: '#FF0000' },
            { from: 'E', to: 'C', weight: 2, color: '#FF0000' },
        ],
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

          <p>The first idea that comes to mind for solving this problem is to run
            a shortest path algorithm (e.g. Dijkstra) from the query point to
            find all sufficiently close listings.</p>


            <GraphVisualizer graph={graph} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
