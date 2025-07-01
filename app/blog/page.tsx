import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white text-gray-900">
      <Header />

      {/* main content */}
      <main className="flex-1 bg-gray-200">
        <h1 className="text-3xl">Blog</h1>
        <Link href="/blog/flatfalcon">Flatfalcon</Link>
      </main>

      <Footer />
    </div>
  );
}
