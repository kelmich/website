import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-screen min-h-screen bg-white text-gray-900">
      <Header />

      {/* main content */}
      <main className="flex-1 bg-white grid lg:grid-cols-2 grid-cols-1">
        <Link href="/blog/flatfalcon/1-introduction">
          <h2>Introduction</h2>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
