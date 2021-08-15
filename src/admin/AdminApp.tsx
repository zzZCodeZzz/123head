import React, {FC} from "react";
import {Switch as RouterSwitch, Route} from "react-router-dom";
import {TournamentsScreen} from "./tournaments/TournamentsScreen";
import {TournamentScreen} from "./tournaments/TournamentScreen";
import {AppBar, createStyles, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Menu as MenuIcon} from "@material-ui/icons";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);



export const AdminApp: FC = () => {

    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Tournaments
                    </Typography>
                </Toolbar>
            </AppBar>
            <RouterSwitch>
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
