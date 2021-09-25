import React from "react";
import {IconButton, Toolbar, Typography, AppBar as MuiAppBar, makeStyles, createStyles} from "@material-ui/core";
import {Menu as MenuIcon} from "@material-ui/icons";
import {Skeleton} from "@material-ui/lab";
import {useCurrentUser} from "../../auth/user.hook";

const useStyles = makeStyles((theme) =>
    createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export const AppBar = () => {

    const classes = useStyles();

    const user = useCurrentUser();

    return (
        <MuiAppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {
                        user
                            ? user.displayName
                            : <Skeleton width={140}/>
                    }
                </Typography>
            </Toolbar>
        </MuiAppBar>
    )
}
