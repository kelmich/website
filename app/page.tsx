import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white text-blue-900">
      {/* header */}
      <header className="h-16 p-4 flex flex-row space-x-4 justify-end items-center border border-blue-900">
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
      <main className="flex-1 bg-blue-400 grid lg:grid-cols-2 grid-cols-1">
        <div className="relative bg-blue-200 border border-blue-900 flex flex-col items-center justify-center p-2">
          <p className="absolute top-1 left-1">01</p>
          <Image
            src="/michaelkeller4.png"
            alt="Picture of Michael Keller"
            width={400}
            height={400}
          />
          That's me.
          <br />
          I'm bad at cooking if you could not tell.
        </div>
        <div className="relative bg-blue-200 border border-blue-900 flex flex-col items-center justify-center p-2">
          <p className="absolute top-1 left-1">02</p>
          <p>
            I work at{" "}
            <a
              href="https://deepjudge.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-700"
            >
              DeepJudge
            </a>
            .<div className="h-8" />I did my Computer Science Bachelors at{" "}
            <a
              href="https://www.ethz.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-700"
            >
              ETH Zürich
            </a>
            .
            <br /> Working on my Masters now.
            <div className="h-8" />
            My current passion project is Flatfalcon.
            <br />
            It concerns efficient shortest path oracles.
            <br />
            Read more{" "}
            <a
              href="https://www.ethz.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-blue-700"
            >
              here
            </a>
            .
          </p>
        </div>
      </main>

      {/* footer */}
      <footer className="min-h-16 p-4 flex flex-row space-x-4 justify-end items-center border border-black">
        © Michael Keller. All rights reserved. (Not like I'd sue you though)
      </footer>
    </div>
  );
}
