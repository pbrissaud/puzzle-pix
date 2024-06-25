"use client"
import {usePathname} from "next/navigation";
import Link from "next/link";
import {LogOutIcon} from "lucide-react";
import {cn} from "@ui/lib/utils";

const ProfileNav = () => {
  const pathnames = usePathname().split("/");

  //print last element of the pathnames array
  console.log(pathnames[pathnames.length - 1]);

  const links = [
    {
      id: "profile",
      href: "/profile",
      label: "General"
    },
    {
      id: "my-rooms",
      href: "/profile/my-rooms",
      label: "My Rooms"
    }
  ]

  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {links.map((link) => (
        <Link key={link.id} href={link.href}
              className={cn(pathnames[pathnames.length - 1] === link.id && 'font-semibold text-primary')}>
          {link.label}
        </Link>
      ))}
      <Link href="/api/auth/logout">
        <div className="flex">
          <LogOutIcon className="w-4 h-4 mr-2"/>
          <span>Sign out</span>
        </div>
      </Link>
    </nav>
  )
}

export default ProfileNav;