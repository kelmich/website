import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { BlogNavigation } from "@/app/components/BlogNavigation";

export default async function Home() {
    return (
        <div className="flex flex-col w-screen min-h-screen">
            <Header />

            <main className="flex justify-center bg-secondary text-secondary-foreground">
                <div className="w-full max-w-3xl space-y-6 p-4">
                    <h1>Chapter 6</h1>
                    <h2>Hub Labels</h2>


                    <BlogNavigation
                        from={{
                            title: "Chapter 5",
                            description: "Contraction Hierarchies",
                            href: "/blog/flatfalcon/5-contraction-hierarchies",
                        }}
                        to={{
                            title: "Chapter 7",
                            description: "Conclusion",
                            href: "/blog/flatfalcon/7-conclusion",
                        }}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
