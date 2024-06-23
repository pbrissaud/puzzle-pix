import {PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading} from "../../components/page-header";
import React from "react";
import {Button} from "@ui/components/ui/button";
import Link from "next/link";

export default function HomePage() {

  return (
    <>
      <div className="absolute top-0 z-0 h-full w-full">
        <div
          className="absolute bottom-auto left-auto right-0 top-00 h-[500px] w-[500px] -translate-x-[10%] translate-y-[30%] rounded-full bg-primary opacity-50 blur-[80px]"></div>
      </div>
      <div className="relative z-10">
        <PageHeader>
          <PageHeaderHeading className="hidden md:block">
            Join the Puzzle Party !
          </PageHeaderHeading>
          <PageHeaderDescription>
            PuzzlePix is the ultimate online multiplayer puzzle game that lets you turn your favorite photos into
            exciting
            puzzles. Play with friends and family, share the fun, and enjoy hours of puzzling entertainment!
          </PageHeaderDescription>
          <PageActions>
            <Button asChild>
              <Link passHref href="/room/create">Create a room</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/rooms">Join public room</Link>
            </Button>
          </PageActions>
        </PageHeader>
      </div>
    </>
  )
}
