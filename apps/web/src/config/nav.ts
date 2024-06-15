import {Icons} from "../components/icons";

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
}

export const mainNav: NavItem[] = [
    {
        title: "Games",
        href: "/games",
    },
    {
        title: "Support",
        href: "/support",
    },
]
