import React, {FC} from "react";
import {Avatar, Typography} from "@material-ui/core";

export const UserPreview: FC = () => {
    return (
      <div style={{display: "inline-flex", alignItems: "center", marginBottom: 8}}>
          <Avatar style={{width: 32, height: 32, marginRight: 8}}/>
          <Typography>Jonathan Jammer</Typography>
      </div>
    );
}
