"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@ui/components/ui/dropdown-menu";
import {Button} from "@ui/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@ui/components/ui/avatar";
import {extractCapitals} from "../../utils";
import {Loader2Icon, LogOutIcon, PuzzleIcon, UserIcon} from "lucide-react";
import Link from "next/link";
import {api} from "../../trpc/react";
import { useToast } from "../../hooks/use-toast";
import { useEffect } from "react";


const UserNav = () => {
    const { data: user, isLoading, isError, error } = api.me.useQuery(undefined, {
        staleTime: 1000 * 30,
        select: (data) => data.user
    })

    const {toast} = useToast()

    useEffect(() => {
        if (isError) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            })
        }
    }, [isError, error])


    if (isLoading) {
        return (
            <Button variant="ghost" disabled>
                <Loader2Icon className="animate-spin"/>
            </Button>
        )
    }

    if (!user) {
        return (
          <Button variant="ghost" asChild>
              <Link href="/login">
                Sign in
              </Link>
          </Button>
        )
    }

    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarFallback>
                        {extractCapitals(user.name).toUpperCase()}
                    </AvatarFallback>
                  <AvatarImage src={user.picture} alt={user.name} />
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </DropdownMenuLabel>
            <Link href="/profile" passHref>
            <DropdownMenuItem className="hover:cursor-pointer">
                <UserIcon className="w-4 h-4 mr-2"/>
                Profile
            </DropdownMenuItem>
            </Link>
          <Link href="/profile/my-rooms" passHref>
            <DropdownMenuItem className="hover:cursor-pointer">
              <PuzzleIcon className="w-4 h-4 mr-2"/>
              My Rooms
            </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator/>
          <Link href="/api/auth/logout">
              <DropdownMenuItem className="hover:cursor-pointer">
                  <div className="flex">
                      <LogOutIcon className="w-4 h-4 mr-2"/>
                      <span>Sign out</span>
                  </div>
              </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
    </DropdownMenu>);
}

export default UserNav;