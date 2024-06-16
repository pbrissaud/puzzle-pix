import {PageHeader, PageHeaderHeading} from "../../../../components/page-header";

import React from "react";
import CreateGameForm from "../../../../components/forms/create-game-form";

const CreateGamePage = () => {
  return (
      <PageHeader>
        <PageHeaderHeading className="hidden md:block">
          Create a game
        </PageHeaderHeading>
          <CreateGameForm/>
      </PageHeader>
  );
}

export default CreateGamePage