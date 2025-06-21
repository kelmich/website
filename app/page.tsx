import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white text-gray-900">
      {/* header */}
      <header className="h-16 p-4 flex flex-row space-x-4 justify-end items-center border border-gray-900">
        <a
          href="https://github.com/kelmich"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          href="https://linkedin.com/in/kelmich"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="mailto:mail@kellermichael.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email
        </a>
      </header>

      {/* main content */}
      <main className="flex-1 bg-white grid lg:grid-cols-2 grid-cols-1">
        <div className="relative bg-gray-200 border border-gray-900 flex flex-col items-center justify-center p-12">
          <p className="absolute top-1 left-1">01</p>
          <Image
            src="/michaelkeller5.png"
            alt="Picture of Michael Keller"
            width={400}
            height={400}
          />
          That&apos;s me.
          <br />
          I&apos;m bad at cooking if you could not tell.
        </div>
        <div className="relative bg-gray-300 border border-gray-900 flex flex-col items-start justify-center p-12 space-y-8 text-left">
          <span>
            <p className="absolute top-1 left-1">02</p>I work at{" "}
            <a
              href="https://deepjudge.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-600"
            >
              DeepJudge
            </a>
            .
          </span>
          <span>
            I did my Computer Science Bachelors at{" "}
            <a
              href="https://www.ethz.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-600"
            >
              ETH Zürich
            </a>
            . Working on my Masters now.
          </span>
          <span>
            My current passion project is Flatfalcon. It concerns efficient
            shortest path oracles. Read more here soon.
          </span>
        </div>
      </main>

      {/* footer */}
      <footer className="min-h-16 p-4 flex flex-wrap justify-end items-center border border-black space-x-3">
        <span>© Michael Keller</span>
        <span>(Not like I&apos;d sue you though)</span>
      </footer>
    </div>
  );
}
