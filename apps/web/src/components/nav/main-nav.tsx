"use client"

import * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {siteConfig} from "../../config/site";
import {cn} from "@ui/lib/utils";
import Logo from "../logo";

export function MainNav() {
    const pathname = usePathname()

    return (
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
                <Logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm lg:gap-6">
                <Link
                  href="/rooms"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/games" ? "text-foreground" : "text-foreground/60"
                    )}
                >
                    Games
                </Link>
            </nav>
        </div>
    )
}