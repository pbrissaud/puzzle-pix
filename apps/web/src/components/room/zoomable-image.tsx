import {DetailedHTMLProps, ImgHTMLAttributes} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@ui/components/ui/dialog";
import Image from "next/image";
import {ImageIcon} from "lucide-react";
import {Button} from "@ui/components/ui/button";

export default function ZoomableImage({
                                        src,
                                        alt
                                      }: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>) {
  if (!src) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <ImageIcon className="mr-2 h-4 w-4"/>View image
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-muted p-0">
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md shadow-md">
          <Image src={src} fill alt={alt || ''} className="h-full w-full object-contain"/>
        </div>
      </DialogContent>
    </Dialog>
  )
}