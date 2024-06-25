import {Button} from "@ui/components/ui/button";
import Link from "next/link";

function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-evenly py-24">
    <h1 className=" text-6xl font-bold">
      <span className="text-primary">404</span>, Page{" "}
        <span className="text-primary">Not Found</span>!
    </h1>
      <Button size="lg" asChild>
        <Link href="/" >Go back home</Link>
      </Button>
  </div>
);
}

export default NotFound;