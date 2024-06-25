import {createUploadthing, type FileRouter} from "uploadthing/next";
import {UploadThingError} from "uploadthing/server";
import {validateRequest} from "../../../server/auth";

const f = createUploadthing();

export const ourFileRouter: FileRouter = {
    imageUploader: f({image: {maxFileSize: "4MB"}})
        .middleware(async () => {
          const { user, session } = await validateRequest();

          // If you throw, the user will not be able to upload
          if (!session) throw new UploadThingError("Unauthorized!");

            return {userId: user.id};
        })
      .onUploadComplete(async ({file}) => {
            return {url: file.url};
        }),
};

export type OurFileRouter = typeof ourFileRouter;