import Link from "next/link";



export type BlogNavigationLink = {
    title: string;
    description: string;
    href: string;
}

const LinkBox = ({ link }: { link: BlogNavigationLink }) => {
    return (
        <Link href={link.href} className="bg-background text-background-foreground border p-2 !no-underline">
            <p>{link.title}</p>
            <p className="!text-sm">{link.description}</p>
        </Link>
    );
}

export const BlogNavigation = ({
    from,
    to,
}: {
    from?: BlogNavigationLink;
    to?: BlogNavigationLink;
}) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                {from ? <LinkBox link={from} /> : <div />}
                {to ? <LinkBox link={to} /> : <div />}
            </div>
        </div>
    );
}