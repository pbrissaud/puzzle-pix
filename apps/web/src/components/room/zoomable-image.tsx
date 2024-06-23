import {DetailedHTMLProps, ImgHTMLAttributes, ReactNode} from "react";
import {Dialog, DialogContent, DialogTrigger} from "@ui/components/ui/dialog";
import Image from "next/image";

export default function ZoomableImage({
                                        src,
                                        alt,
                                        children
                                      }: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  children: ReactNode
}) {
  if (!src) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-7xl border-0 bg-muted p-0">
        <div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md shadow-md">
          <Image src={src} fill alt={alt || ''} className="h-full w-full object-contain"/>
        </div>
      </DialogContent>
    </Dialog>
  )
}