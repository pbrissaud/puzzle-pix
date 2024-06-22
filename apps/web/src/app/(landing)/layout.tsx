import {SiteFooter} from "../../components/nav/site-footer";


interface AppLayoutProps {
    children: React.ReactNode
}

export default function LandingLayout({ children }: AppLayoutProps) {
    return (
      <div className="flex flex-col h-[calc(100vh-60px)]">
        <main className="flex-grow">{children}</main>
            <SiteFooter />
      </div>
    )
}