import React, {FC} from "react";
import {Route, Switch as RouterSwitch} from "react-router-dom";
import {TournamentsScreen} from "./tournaments/TournamentsScreen";
import {TournamentScreen} from "./tournaments/TournamentScreen";
import {LoginScreen} from "../login/LoginScreen";
import {SignUpScreen} from "../login/SignUpScreen";
import {AppBar} from "./app-bar/AppBar";

export const AdminApp: FC = () => {
    return (
        <React.Fragment>
            <AppBar/>
            <RouterSwitch>
                <Route exact path="/signUp">
                    <SignUpScreen/>
                </Route>
                <Route exact path="/login">
                    <LoginScreen/>
                </Route>
                <Route exact path="/tournaments">
                    <TournamentsScreen/>
                </Route>
                <Route exact path={`/tournaments/:id`}>
                    <TournamentScreen/>
                </Route>
            </RouterSwitch>
        </React.Fragment>
    )
};
