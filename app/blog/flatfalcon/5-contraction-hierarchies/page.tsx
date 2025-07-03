import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BlogNavigation } from "@/app/components/BlogNavigation";

export default async function Home() {
    return (
        <div className="flex flex-col w-screen min-h-screen">
            <Header />

            <main className="flex justify-center bg-secondary text-secondary-foreground">
                <div className="w-full max-w-3xl space-y-6 p-4">
                    <h1>Chapter 5</h1>
                    <h2>Contraction Hierarchies</h2>


                    <BlogNavigation
                        from={{
                            title: "Chapter 4",
                            description: "Full Precompute",
                            href: "/blog/flatfalcon/4-full-precompute",
                        }}
                        to={{
                            title: "Chapter 6",
                            description: "Hub Labels",
                            href: "/blog/flatfalcon/6-hub-labels",
                        }}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
