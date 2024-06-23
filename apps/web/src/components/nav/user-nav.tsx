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
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {extractCapitals} from "../../utils";
import {LogOutIcon, PuzzleIcon, UserIcon} from "lucide-react";
import Link from "next/link";
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";


export async function UserNav() {
    const {getUser, isAuthenticated} = getKindeServerSession();
    const user = await getUser();

    if (!await isAuthenticated()) {
        return (
        <LoginLink>
            <Button variant="ghost">Sign in</Button>
        </LoginLink>
        )
    }

    if (!user) {
        return null;
    }

    const fullName = `${user.given_name} ${user.family_name}`;

    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.picture ?? undefined}/>
                    <AvatarFallback>
                        {extractCapitals(fullName).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{fullName}</p>
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
            <DropdownMenuItem className="hover:cursor-pointer">
                <LogoutLink>
                    <div className="flex">
                <LogOutIcon className="w-4 h-4 mr-2"/>
                        <span>Sign out</span>
                    </div>
                </LogoutLink>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>);
}
