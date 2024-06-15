import {PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading} from "../../../components/page-header";
import {Button} from "@ui/components/ui/button";
import React from "react";
import Link from "next/link";

const GameListPage = () => {
    return (
        <PageHeader>
            <PageHeaderHeading className="hidden md:block">
                Public games
            </PageHeaderHeading>
            <PageHeaderDescription>
                Join a public game or create your own and invite friends to play with you.
            </PageHeaderDescription>
            <PageActions>
                <Link passHref href="/game/create">
                    <Button>Create your own game</Button>
                </Link>
            </PageActions>
        </PageHeader>
    )
}

export default GameListPage;