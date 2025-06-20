import { Github, Linkedin, Twitter, Mail } from "lucide-react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  return (
    <footer className={`h-16 bg-slate-800 border-t border-slate-700 ${className}`}>
      <div className="h-full max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © 2024 My Website. All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="mailto:contact@example.com"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Quick Links - Hidden on mobile */}
        <div className="hidden sm:flex items-center space-x-6 text-sm">
          <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
