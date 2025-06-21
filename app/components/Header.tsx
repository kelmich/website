interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  return (
    <header className={`h-16 bg-slate-800 border-b border-slate-700 ${className}`}>
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-white">My Website</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-300 hover:text-white transition-colors">
            Home
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">
            About
          </a>
          <a href="#projects" className="text-gray-300 hover:text-white transition-colors">
            Projects
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
            Contact
          </a>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-gray-300 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
