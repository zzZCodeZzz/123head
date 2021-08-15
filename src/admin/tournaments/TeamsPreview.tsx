import React, {FC} from "react";
import {UserPreview} from "../users/UserPreview";

export const TeamsPreview: FC = () => {
  return (
      <div style={{display: "flex"}}>
          <UserPreview/>
          <UserPreview/>
      </div>
  );
};
