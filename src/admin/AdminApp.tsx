import React, {FC} from "react";
import {Switch as RouterSwitch, Route} from "react-router-dom";
import {AdminTournaments} from "./tournaments/AdminTournaments";
import {AdminTournament} from "./tournaments/AdminTournament";


export const AdminApp: FC = () => {
    return (
        <RouterSwitch>
            <Route exact path="/tournaments">
                <AdminTournaments/>
            </Route>
            <Route exact path={`/tournaments/tournament/:id`}>
                <AdminTournament/>
            </Route>
        </RouterSwitch>
    )
};
