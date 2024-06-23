import Image from "next/image"

import {Card, CardContent,} from "@ui/components/ui/card"
import {ScrollArea, ScrollBar} from "@ui/components/ui/scroll-area"
import {UploadedFile} from "../../../types/file-upload";
import {EmptyCard} from "@ui/components/ui/empty-card";

interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}

export function UploadedFilesCard({uploadedFiles}: UploadedFilesCardProps) {
    return (
        <Card>
          <CardContent className="p-2">
                {uploadedFiles.length > 0 ? (
                  <ScrollArea className="py-4">
                    <div className="flex w-max space-x-2.5 h-48">
                            {uploadedFiles.map((file) => (
                              <div key={file.key}>
                                    <Image
                                        src={file.url}
                                        alt={file.name}
                                        fill
                                        loading="lazy"
                                        className="rounded-md object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                ) : (
                    <EmptyCard
                        title="No files uploaded"
                        description="Upload some files to see them here"
                        className="w-full"
                    />
                )}
            </CardContent>
        </Card>
    )
}