import Link from "next/link";

type Breadcrumb = {label: string, url: string | null};

export default function Breadcrumb ({ breadcrumbs }: { breadcrumbs: Array<Breadcrumb> }): JSX.Element {
    return (
        <nav>
            {breadcrumbs.map((breadcrumb, index) => 
                <span key={index}>
                    {breadcrumb.url ? (
                        <Link href={breadcrumb.url}>{breadcrumb.label}</Link>
                    ) : (
                        <span>{breadcrumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && <span>{' '}&gt;{' '}</span>}
                </span>
            )}
        </nav>
    )
}
