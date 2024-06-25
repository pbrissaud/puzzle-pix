import {PageHeader, PageHeaderHeading} from "../../../../components/page-header";

import React from "react";
import CreateRoomForm from "../../../../components/forms/create-room-form";

const CreateRoomPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading className="hidden md:block">
          Create a room
        </PageHeaderHeading>
      </PageHeader>
      <div className="container">
        <CreateRoomForm/>
      </div>
    </>
  );
}

export default CreateRoomPage