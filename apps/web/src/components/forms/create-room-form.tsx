"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {Button} from "@ui/components/ui/button"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@ui/components/ui/form"
import {Input} from "@ui/components/ui/input";
import {Checkbox} from "@ui/components/ui/checkbox";
import {FileUploader} from "./file-uploader/file-uploader";
import {useUploadFile} from "../../hooks/use-upload-file";
import {useEffect, useState} from "react";
import {UploadedFilesCard} from "./file-uploader/uploaded-files-card";
import {Loader2Icon} from "lucide-react";
import {Slider} from "@ui/components/ui/slider";
import {api} from "../../trpc/react";
import {z} from "zod";
import {createRoomSchema} from "../../server/api/schemas";
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
      toast({
        title: "Redirecting...",
        duration: 1000,
        description: "The room has been created. Redirecting you to the room...",
      })
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
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="images"
              render={({field}) => (
                <div className="space-y-6">
                  {uploadedFiles.length === 0 ? (
                    <FormItem className="w-full">
                      <FormLabel>Picture</FormLabel>
                      <FormControl>
                        <FileUploader
                          value={field.value}
                          onValueChange={field.onChange}
                          maxFiles={1}
                          maxSize={4 * 1024 * 1024}
                          progresses={progresses}
                          onUpload={uploadFiles}
                          disabled={isUploading}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  ) : (
                    <div className="space-y-2">
                      <FormLabel>Picture</FormLabel>
                      <UploadedFilesCard uploadedFiles={uploadedFiles}/>
                    </div>
                  )}
                </div>
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
                    This is the name of your room.
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
                      Public rooms will be listed in the public rooms list. Whatever you choose, anyone with the link
                      can join the room.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nbPieces"
              render={({field: {value, onChange}}) => (
                <FormItem>
                  <FormLabel>Nb pieces - {value}</FormLabel>
                  <FormControl className="pt-0.5">
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