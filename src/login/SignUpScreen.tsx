import React, {FC} from "react";
import {makeStyles} from "@material-ui/core";
import {SignUpForm} from "./form/SignUpForm";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: theme.spacing(3)
    }
}));

export const SignUpScreen: FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <SignUpForm/>
        </div>
    )
}
