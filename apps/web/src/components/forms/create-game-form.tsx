"use client";

import {useForm} from "react-hook-form";
import {z} from "zod"
import {createGameFormSchema, CreateGameFormSchema} from "../../types/game-creation";
import {zodResolver} from "@hookform/resolvers/zod"
import {createGame} from "../../app/actions";
import {Button} from "@ui/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form"
import {Input} from "@ui/components/ui/input";
import {Checkbox} from "@ui/components/ui/checkbox";
import {FileUploader} from "../file-uploader";
import {useUploadFile} from "../../hooks/use-upload-file";
import {useEffect, useState} from "react";
import {UploadedFilesCard} from "../uploaded-files-card";


const CreateGameForm = () => {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof createGameFormSchema>>({
        resolver: zodResolver(createGameFormSchema),
        defaultValues: {
            name: "",
            isPublic: false,
            image: [],
            slots: 1,
            nbPieces: 10,
        }
    })

    const {uploadFiles, progresses, uploadedFiles, isUploading} = useUploadFile(
        "imageUploader",
        {defaultUploadedFiles: []}
    )

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            setLoading(false)
        } else {
            setLoading(true)
        }
        return () => {
            setLoading(false)
        }
    }, [uploadedFiles]);

    async function onSubmit(input: CreateGameFormSchema) {
        setLoading(true)
        await createGame({
            name: input.name,
            isPublic: input.isPublic,
            img: uploadedFiles[0].url,
            slots: input.slots,
            nbPieces: input.nbPieces,
        })
        setLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of your game.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isPublic"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Public game
                                </FormLabel>
                                <FormDescription>
                                    Public games can be joined by anyone. They will be listed on the public games page.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({field}) => (
                        <div className="space-y-6">
                            {uploadedFiles.length === 0 ? (

                                <FormItem className="w-full">
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <FileUploader
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            maxFiles={1}
                                            maxSize={10 * 1024 * 1024}
                                            progresses={progresses}
                                            onUpload={uploadFiles}
                                            disabled={isUploading}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            ) : (
                                <UploadedFilesCard uploadedFiles={uploadedFiles}/>
                            )}
                        </div>
                    )}
                />

                <FormField
                    control={form.control}
                    name="slots"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Max Players</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" min="1" max="10"
                                       onChange={event => field.onChange(+event.target.value)}/>
                            </FormControl>
                            <FormDescription>
                                The maximum number of players that can join this game.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="nbPieces"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Number of Pieces</FormLabel>
                            <FormControl>
                                <Input {...field} type="number" min="10" max="1000"
                                       onChange={event => field.onChange(+event.target.value)}/>
                            </FormControl>
                            <FormDescription>
                                The number of pieces in the game.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex flew-row space-x-2">
                    <Button type="submit" disabled={loading}>Create Game</Button>
                </div>

            </form>
        </Form>
    )
}

export default CreateGameForm