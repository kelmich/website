import Link from "next/link";

export default function Header() {
  return (
    <header className="h-16 p-4 flex flex-row space-x-4 justify-between items-center border-b bg-background text-background-foreground">
      <div className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        {/*<Link href="/pomodoro">Pomodoro</Link>*/}
      </div>
      <div className="space-x-4">
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
      </div>
    </header>
  );
}
