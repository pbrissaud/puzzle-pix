"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@ui/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form"
import {Input} from "@ui/components/ui/input";
import {Checkbox} from "@ui/components/ui/checkbox";
import {FileUploader} from "../file-uploader";
import {useUploadFile} from "../../hooks/use-upload-file";
import {useEffect, useState} from "react";
import {UploadedFilesCard} from "../uploaded-files-card";
import {Loader2Icon} from "lucide-react";
import {Slider} from "@ui/components/ui/slider";
import {api} from "../../trpc/react";
import {z} from "zod";
import {createRoomSchema} from "../../server/api/schemas/room";
import {useToast} from "../../hooks/use-toast";
import {useRouter} from "next/navigation";

// modify this schema to match the schema from the server
const createRoomFormSchema = createRoomSchema.omit({imgUrl: true}).extend({
  images: z.array(z.instanceof(File)),
})

type createRoomFormType = z.infer<typeof createRoomFormSchema>

const CreateRoomForm = () => {
  const [imageUploaded, setImageUploaded] = useState(false)
  const {toast} = useToast()
  const router = useRouter()
  const form = useForm<createRoomFormType>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues: {
      name: "",
      public: false,
      images: [],
      maxPlayers: 1,
      nbPieces: 100,
    }
  })

  const {uploadFiles, progresses, uploadedFiles, isUploading} = useUploadFile(
    "imageUploader",
    {defaultUploadedFiles: []}
  )

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setImageUploaded(true)
    } else {
      setImageUploaded(false)
    }
    return () => {
      setImageUploaded(false)
    }
  }, [uploadedFiles]);

  const {mutate, isPending} = api.room.create.useMutation({
    onSuccess: ({roomId}: { roomId: string }) => {
      form.reset()
      router.push(`/room/${roomId}`)
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  });

  async function onSubmit(data: createRoomFormType) {
    const dataWithoutImages = {...data, ['images']: undefined};
    return mutate({
      ...dataWithoutImages,
      imgUrl: uploadedFiles[0].url
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="md:grid grid-cols-2 gap-12 space-y-8 md:space-y-0">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={({field}) => (
                <div className="space-y-6">
                  {uploadedFiles.length === 0 ? (
                    <FormItem className="w-full">
                      <FormLabel>Image</FormLabel>
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
              name="nbPieces"
              render={({field: {value, onChange}}) => (
                <FormItem>
                  <FormLabel>Nb pieces - {value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={100}
                      max={1000}
                      step={100}
                      defaultValue={[value]}
                      onValueChange={(vals) => {
                        onChange(vals[0]);
                      }}
                      value={[form.getValues("nbPieces")]}
                    />
                  </FormControl>
                  <FormDescription>
                    The number of pieces the image will be cut into. Note that it's just an approximation, the actual
                    number of pieces might be different.
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8">
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
              name="public"
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
                      Public room
                    </FormLabel>
                    <FormDescription>
                      Public rooms will be listed in the public rooms list. Both private and public rooms can be joined
                      by
                      anyone with the link
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxPlayers"
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
          </div>
        </div>
        <div className="flex flew-row justify-end md:pt-6">
          <Button type="submit" disabled={!imageUploaded || isPending}>{isPending ?
            <div className="flex items-center"><Loader2Icon className="mr-2 h-4 w-4 animate-spin"/> Please wait
            </div> : "Create Game"}</Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateRoomForm