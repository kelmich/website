import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import BarChart from "@/app/components/BarChart";
import { queryPerformance } from "@/content/blog/flatfalcon/results";
import { ContractionVisualizer } from "@/content/blog/flatfalcon/5-contraction-hierarchies-introduction/ContractionVisualizer";
import CodeBlock from "@/app/components/CodeBlock";

export default async function Home() {
    return (
        <>
            <h1>Chapter 6</h1>
            <h2>Contraction Hierarchies Theory</h2>

            <p>
                Our goal now is to keep query performance as close as possible to
                what we have with full precompute, while reducing the startup and
                memory overhead. One way to achieve this is with Contraction
                Hierarchies.
            </p>


        </>
    );
}
