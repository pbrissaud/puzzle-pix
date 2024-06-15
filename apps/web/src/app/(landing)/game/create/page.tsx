import {Button} from "@ui/components/ui/button";
import {PageHeader, PageHeaderHeading} from "../../../../components/page-header";

import React from "react";

const CreateGamePage = () => {
  return (
      <PageHeader>
        <PageHeaderHeading className="hidden md:block">
          Create a game
        </PageHeaderHeading>
      </PageHeader>
  );
}

export default CreateGamePage