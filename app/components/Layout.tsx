import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-900 ${className}`}>
      {/* Header - Fixed height */}
      <Header />

      {/* Main Content - Flexible height that fills remaining space */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Fixed height */}
      <Footer />
    </div>
  );
}
