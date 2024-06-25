import { Metadata } from "next"
import Link from "next/link"
import {Button} from "@ui/components/ui/button";
import Logo from "../../components/logo";
import * as React from "react";
import BrandIcons from "../../components/brand-icons";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to create a new room"
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
          <Button variant="ghost" asChild>
          <Link
            href="/"
            className="absolute right-4 top-4 md:right-8 md:top-8"
          >
            Home Page
          </Link>
        </Button>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo />
            PuzzlePix
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
               Login allow you to create a room to play with your own images ! And it's free !
              </p>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Log In
              </h1>
              <p className="text-sm text-muted-foreground">
                Use your favourite auth provider to connect to PuzzlePix
              </p>
            </div>
            <div className="grid gap-4 sm:w-[350px] mx-auto">
              <Button variant="outline" size="lg" type="button" className="bg-white hover:bg-gray-200 text-black hover:text-black" asChild>
                <Link href="/api/auth/login/google">
                  <BrandIcons.google className="mr-2 h-4 w-4"/>
                  Google
                </Link>
              </Button>
              <Button size="lg" type="button" className="bg-gray-900 hover:bg-gray-700 text-white hover:text-white" asChild>
                <Link href="/api/auth/login/github">
                  <BrandIcons.gitHub className="mr-2 h-4 w-4"/>
                  GitHub
                </Link>
              </Button>
              <Button size="lg" type="button" className="bg-purple-700 hover:bg-purple-900 text-white hover:text-white" asChild>
                <Link href="/api/auth/login/twitch">
                  <BrandIcons.twitch className="mr-2 h-4 w-4 "/>
                  Twitch
                </Link>
              </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}