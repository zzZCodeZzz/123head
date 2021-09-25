import React, {FC} from "react";
import {PlayerPreview} from "../users/PlayerPreview";

export const TeamsPreview: FC = () => {
  return (
      <div style={{display: "flex"}}>
          <PlayerPreview displayName={"max"}/>
          <PlayerPreview displayName={"moritz"}/>
      </div>
  );
};
