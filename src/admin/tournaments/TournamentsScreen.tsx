import React, {FC} from "react";
import {useHistory} from "react-router-dom";
import {NewTournamentFormDialog, NewTournamentState} from "./form/NewTournamentFormDialog";
import {Container, Fab, makeStyles} from "@material-ui/core";
import {useAppDispatch, useAppSelector} from "../../redux/types";
import {selectAllTournaments} from "./redux/tournaments.slice";
import {createTournamentThunk, listTournamentsThunk} from "./redux/tournaments.thunk";
import {Add as AddIcon} from "@material-ui/icons";
import {TournamentPreviewCard} from "./TournamentPreviewCard";

const useStyles = makeStyles((theme) => ({
    container: {display: 'flex', flexDirection: "column"},
    contentContainer: {
        paddingTop: theme.spacing(2)
    },
    actionButton: {
        position: 'fixed',
        bottom: 16,
        right: 16,
    }
}));

export const TournamentsScreen: FC = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const history = useHistory();

    const tournaments = useAppSelector(selectAllTournaments);
    const loading = useAppSelector((state) => state.tournaments.loading);

    const handleCreateTournament = (t: NewTournamentState) =>
        dispatch(createTournamentThunk({
            ...t,
            date: t.date.getTime(),
        }))
            .then(() => history.replace("/tournaments"))
            .catch(() => {});

    const navigateToTournament = (id: string) => history.push("/tournaments/" + id);
    const navigateToForm = () => history.replace("/tournaments#new-tournament");

    React.useEffect(() => {
        dispatch(listTournamentsThunk())
    }, [dispatch])

    return (
        <div>
            <NewTournamentFormDialog
                onSubmit={handleCreateTournament}
                loading={loading}
            />
            <Container className={classes.container}>
                <div className={classes.contentContainer}>
                    {tournaments.map((t) => (
                       <TournamentPreviewCard
                           tournament={t}
                           onClick={() => navigateToTournament(t.id)}
                           cardProps={{style: {marginBottom: 16}}}
                       />
                    ))}
                </div>
                <Fab
                    color="primary"
                    onClick={navigateToForm}
                    className={classes.actionButton}
                >
                    <AddIcon />
                </Fab>
            </Container>
        </div>
    )
};
