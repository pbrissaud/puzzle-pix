import "@uploadthing/react/styles.css";
import React from "react";
import {NextSSRPlugin} from "@uploadthing/react/next-ssr-plugin";
import {extractRouterConfig} from "uploadthing/server";
import {ourFileRouter} from "../../../api/uploadthing/core";

const CreateGameLayout = ({children}: { children: React.ReactNode }) => {
    return <>
        <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
    </>
}

export default CreateGameLayout