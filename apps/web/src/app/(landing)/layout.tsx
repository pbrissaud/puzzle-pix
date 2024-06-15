import {SiteFooter} from "../../components/nav/site-footer";


interface AppLayoutProps {
    children: React.ReactNode
}

export default function LandingLayout({ children }: AppLayoutProps) {
    return (
        <>
            <main className="flex-1">{children}</main>
            <SiteFooter />
        </>
    )
}