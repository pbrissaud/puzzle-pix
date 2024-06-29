import {MainNav} from "./main-nav";
import {MobileNav} from "./mobile-nav";
import {ModeToggle} from "./mode-toggle";
import UserNav from "./user-nav";

export function SiteHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center px-10">
                <MainNav />
                <MobileNav />
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                    </div>
                    <nav className="flex items-center space-x-1">
                        <ModeToggle />
                        <UserNav />
                    </nav>
                </div>
            </div>
        </header>
    )
}