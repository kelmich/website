export default function Header() {
  return (
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
  );
}
