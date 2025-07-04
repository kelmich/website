import Link from "next/link";

export type BlogNavigationLink = {
  title: string;
  description: string;
  href: string;
};

export const BlogNavigation = ({
  from,
  to,
}: {
  from?: BlogNavigationLink;
  to?: BlogNavigationLink;
}) => {
  return (
    <div className="flex flex-row items-center justify-center gap-12">
      {from && <Link href={from.href}>Previous Chapter</Link>}
      {to && <Link href={to.href}>Next Chapter</Link>}
    </div>
  );
};
