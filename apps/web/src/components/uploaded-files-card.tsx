import Image from "next/image"

import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@ui/components/ui/card"
import {ScrollArea, ScrollBar} from "@ui/components/ui/scroll-area"
import {UploadedFile} from "../types/file-upload";
import {EmptyCard} from "@ui/components/ui/empty-card";

interface UploadedFilesCardProps {
    uploadedFiles: UploadedFile[]
}

export function UploadedFilesCard({uploadedFiles}: UploadedFilesCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Image</CardTitle>
                <CardDescription>View the uploaded image here</CardDescription>
            </CardHeader>
            <CardContent>
                {uploadedFiles.length > 0 ? (
                    <ScrollArea className="pb-4">
                        <div className="flex w-max space-x-2.5">
                            {uploadedFiles.map((file) => (
                                <div key={file.key} className="relative aspect-video w-96">
                                    <Image
                                        src={file.url}
                                        alt={file.name}
                                        fill
                                        sizes="(min-width: 640px) 640px, 100vw"
                                        loading="lazy"
                                        className="rounded-md object-cover"
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