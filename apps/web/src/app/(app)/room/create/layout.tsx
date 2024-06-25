import "@uploadthing/react/styles.css";
import React from "react";
import {validateRequest} from "../../../../server/auth";
import {redirect} from "next/navigation";

const CreateRoomLayout = async ({children}: { children: React.ReactNode }) => {
    const { user, session } = await validateRequest();

    if (!user || !session) redirect("/login");

    return <>
        {children}
    </>
}

export default CreateRoomLayout