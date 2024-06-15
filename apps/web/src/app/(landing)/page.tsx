import {PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading} from "../../components/page-header";
import React from "react";
import {Button} from "@ui/components/ui/button";
import Link from "next/link";

export default function HomePage() {

  return (
      <PageHeader>
          <PageHeaderHeading className="hidden md:block">
              Join the Puzzle Party !
          </PageHeaderHeading>
          <PageHeaderDescription>
              PuzzlePix is the ultimate online multiplayer puzzle game that lets you turn your favorite photos into exciting puzzles. Play with friends and family, share the fun, and enjoy hours of puzzling entertainment!
          </PageHeaderDescription>
          <PageActions>
              <Link passHref href="/game/create">
                  <Button>Create a game</Button>
              </Link>
              <Link passHref href="/games">
                <Button variant="outline">Join public games</Button>
              </Link>
          </PageActions>
      </PageHeader>
  );
}
