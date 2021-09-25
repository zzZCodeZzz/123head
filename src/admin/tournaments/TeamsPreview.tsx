import React, {FC} from "react";
import {PlayerPreview} from "../users/PlayerPreview";
import {Player} from "./redux/types";
import _ from "lodash";

const drawTeams = (players: Player[], size: number): Player[][] => {
    const randomPlayers = _.shuffle(players);
    const teams: Player[][] = [];
    let currentTeamIndex = 0;
    for (let i = 0; i < randomPlayers.length; i++) {
        if (teams[currentTeamIndex].length < size || i === randomPlayers.length - 1) {
            teams[currentTeamIndex].push(randomPlayers[i]);
        }
    }
    return teams;
}

export const TeamsPreview: FC = () => {
    return (
        <div style={{display: "flex"}}>
            <PlayerPreview displayName={"max"}/>
            <PlayerPreview displayName={"moritz"}/>
        </div>
    );
};
