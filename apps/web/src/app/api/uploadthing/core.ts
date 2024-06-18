import {createUploadthing, type FileRouter} from "uploadthing/next";
import {UploadThingError} from "uploadthing/server";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

const f = createUploadthing();

const auth = async () => {
    const {getUser} = getKindeServerSession()
  return getUser()
};

export const ourFileRouter: FileRouter = {
    imageUploader: f({image: {maxFileSize: "4MB"}})
        .middleware(async () => {
            const user = await auth();

            if (!user) throw new UploadThingError("Unauthorized");

            return {userId: user.id};
        })
      .onUploadComplete(async ({file}) => {
            return {url: file.url};
        }),
};

export type OurFileRouter = typeof ourFileRouter;