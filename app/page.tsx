import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen">
      <Header />

      {/* main content */}
      <main className="flex-1 grid lg:grid-cols-2 grid-cols-1">
        <div className="relative border flex flex-col items-center justify-center p-12 bg-primary text-primary-foreground">
          <p className="absolute top-1 left-1">01</p>
          <Image
            src="/michaelkeller7.jpeg"
            alt="Picture of Michael Keller"
            width={400}
            height={400}
          />
          <p className="pt-4">That&apos;s me.</p>
        </div>
        <div className="relative border flex flex-col items-start justify-center p-12 space-y-8 text-left bg-secondary text-secondary-foreground">
          <span>
            <p className="absolute top-1 left-1">02</p>I work at{" "}
            <a
              href="https://deepjudge.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              DeepJudge
            </a>{" "}
            as a Software Engineer.
          </span>
          <span>
            I did my Computer Science Bachelor&apos;s at{" "}
            <a
              href="https://www.ethz.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              ETH Zürich
            </a>
            . While I was there, I was a board member of the{" "}
            <a
              href="https://vis.ethz.ch"
              target="_blank"
              rel="noopener noreferrer"
            >
              Computer Science Student Association (VIS)
            </a>{" "}
            in charge of the Software Development Commission. I’m currently
            pursuing my Master&apos;s degree.
          </span>
          <span>
            My current passion project is Flatfalcon. It concerns efficient
            shortest path oracles. Read more here soon.
          </span>
        </div>
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
}
