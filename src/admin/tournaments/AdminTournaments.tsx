import React, {FC} from "react";
import {useHistory} from "react-router-dom";
import {NewTournamentFormDialog, NewTournamentState} from "./form/NewTournamentFormDialog";
import {Button, Card, CardContent, CardHeader, Container, makeStyles, Typography} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../redux/types";
import {selectAllTournaments} from "./redux/tournaments.slice";
import {format} from "date-fns";
import {createTournamentThunk, listTournamentsThunk} from "./redux/tournaments.thunk";

const useStyles = makeStyles((theme) => ({
    container: {display: 'flex', flexDirection: "column", minHeight: "100vh",},
    contentContainer: {
        paddingTop: theme.spacing(2),
        flex: 8
    },
    buttonContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: "center"
    }
}));

export const AdminTournaments: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const history = useHistory();

    React.useEffect(() => {
        dispatch(listTournamentsThunk())
    }, [dispatch])

    const tournaments = useAppSelector(selectAllTournaments);
    const loading = useAppSelector((state) => state.tournaments.loading);

    const handleCreateTournament = (t: NewTournamentState) =>
        dispatch(createTournamentThunk({
            ...t, date: t.date.getTime()
        }))
            .then(() => {
                history.replace("/tournaments");
            })
            .catch(() => {
            })

    return (
        <div>
            <NewTournamentFormDialog
                onSubmit={handleCreateTournament}
                loading={loading}
            />
            <Container className={classes.container}>
                <div className={classes.contentContainer}>
                    <Typography variant={"h4"} style={{marginBottom: 16, textAlign: "center"}}>
                        Tournaments
                    </Typography>
                    {tournaments.map((t) => (
                        <Card style={{marginBottom: 16}} onClick={() => history.push("/tournaments/tournament/" + t.id)}>
                            <CardHeader
                                title={t.name}
                                subheader={t.description}
                            />
                            <CardContent>
                                {format(t.date, "dd.mm.yyyy HH:mm")}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className={classes.buttonContainer}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.replace("/tournaments#new-tournament")}
                    >
                        New Tournament
                    </Button>
                </div>
            </Container>
        </div>
    )
};
