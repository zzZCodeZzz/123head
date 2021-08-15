import React, {FC} from "react";
import {Tournament} from "./redux/types";
import {Card, CardContent, CardProps, makeStyles, Typography} from "@material-ui/core";
import {format} from "date-fns";
import {Schedule as TimeIcon} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    subtitle: {
        marginTop: theme.spacing(2)
    },
    date: {
        marginTop: theme.spacing(2),
        display: 'inline-flex',
        alignItems: 'center'
    }
}))

interface TournamentPreviewCardProps {
    tournament: Tournament;
    onClick: () => void;
    cardProps?: CardProps;
}

export const TournamentPreviewCard: FC<TournamentPreviewCardProps> = ({tournament, onClick, cardProps}) => {
    const classes = useStyles();
    return (
        <Card {...cardProps} onClick={onClick}>
            <CardContent>
                <Typography variant="h5">{tournament.name}</Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    className={classes.subtitle}
                >
                    {tournament.description}
                </Typography>
                <Typography variant="body1" className={classes.date}>
                    <TimeIcon fontSize={"small"}/> {format(tournament.date, "dd.mm.yyyy HH:mm")}
                </Typography>
            </CardContent>
        </Card>
    )
}
