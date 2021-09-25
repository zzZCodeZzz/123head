import React, {FC} from "react";
import {makeStyles} from "@material-ui/core";
import {LoginForm} from "./form/LoginForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: theme.spacing(3)
    }
}));

export const LoginScreen: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <LoginForm/>
        </div>
    )
}
