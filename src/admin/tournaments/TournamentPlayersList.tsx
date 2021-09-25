import React, {FC} from "react";
import {Player} from "./redux/types";
import {PlayerPreview} from "../users/PlayerPreview";

export const TournamentPlayersList: FC<{ players: Player[]; tournamentId: string; ownId?: string; }> = ({players, tournamentId, ownId}) => {

    return (
        <div>
            {players.map((p) => (
                <div>
                    <PlayerPreview
                        key={p.userId}
                        displayName={p.displayName}
                        onLeave={ownId === p.userId ? () => {} : undefined}
                    />
                </div>
            ))}
        </div>
    )
}
