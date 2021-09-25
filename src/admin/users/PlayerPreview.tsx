import React, {FC} from "react";
import {Avatar, IconButton, Typography} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";

export const PlayerPreview: FC<{displayName: string, onLeave?: () => void}> = ({displayName}) => {
    return (
      <div style={{display: "inline-flex", alignItems: "center", marginBottom: 8}}>
          <Avatar style={{width: 32, height: 32, marginRight: 8}}/>
          <Typography>{displayName}</Typography>
          <IconButton size="small" style={{marginLeft: 16}}><ExitToApp fontSize="small"/></IconButton>
      </div>
    );
}
