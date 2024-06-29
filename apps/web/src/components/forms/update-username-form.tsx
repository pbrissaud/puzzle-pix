"use client"
import {Input} from "@ui/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@repo/ui/components/ui/form";
import { UpdateUsername, updateUsernameSchema } from "../../server/api/schemas";
import { api } from "../../trpc/react";
import { useToast } from "../../hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@repo/ui/components/ui/button";

const UpdateUsernameForm = ({username}: {username: string}) => {
  const {toast} = useToast()
  const queryClient = useQueryClient()
  
  const form = useForm<UpdateUsername>({
    resolver: zodResolver(updateUsernameSchema),
    defaultValues: {
      username: username
    }
  })

  const {mutate, isPending} = api.updateUserName.useMutation({
    onSuccess: () => {
      toast({
        title: "Username updated",
        duration: 1000,
        description: "Your username has been updated",
      })
      queryClient.invalidateQueries({queryKey: [["me"], {type: "query"}]})
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    }
  });

  async function onSubmit(data: UpdateUsername) {
    await mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-row space-x-4">
          <div className="flex-grow">
        <FormField control={form.control} name="username" render={({field}) => (
          <FormItem>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        </div>
        <Button type="submit" disabled={isPending}>Save</Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateUsernameForm;