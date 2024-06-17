"use client"

import {PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading} from "../../../../components/page-header";
import Link from "next/link";
import {Button} from "@ui/components/ui/button";
import React from "react";

const errorPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading className="hidden md:block">
          Room not found
        </PageHeaderHeading>
        <PageHeaderDescription>
          The room you are looking for does not exist.
        </PageHeaderDescription>
        <PageActions>
          <Link passHref href="/rooms">
            <Button>Go back to the list of rooms</Button>
          </Link>
        </PageActions>
      </PageHeader>
    </>
  )
}

export default errorPage;