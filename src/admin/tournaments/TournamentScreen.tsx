import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/types";
import {selectTournamentById} from "./redux/tournaments.slice";
import {getTournamentThunk, joinTournamentThunk} from "./redux/tournaments.thunk";
import {Button, CircularProgress, Collapse, Container, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import {Autorenew, Schedule as TimeIcon} from "@material-ui/icons";
import {TeamsPreview} from "./TeamsPreview";
import {formatDate} from "../../date.utils";
import {useCurrentUser} from "../../auth/user.hook";
import {TournamentPlayersList} from "./TournamentPlayersList";
import {Skeleton} from "@material-ui/lab";

export const TournamentScreen: FC = () => {

    const dispatch = useAppDispatch();

    const user = useCurrentUser();

    const [tabIndex, setTabIndex] = React.useState(0);

    const {id} = useParams<{ id: string }>();

    React.useEffect(() => {
        dispatch(getTournamentThunk(id));
    }, [dispatch, id]);

    const tournament = useAppSelector((state) => selectTournamentById(state, id));

    const loading = useAppSelector((state) => state.tournaments.loading);

    const hasJoinedTournament = tournament && tournament?.players.some(p => p.userId === user?.uid);

    const handleJoinTournament = () => {
        if (user && user.displayName) {
            dispatch(joinTournamentThunk({
                tournamentId: id,
                player: {
                    userId: user.uid,
                    displayName: user.displayName
                }
            }))
        }
    };

    return (
        <Container style={{paddingTop: 16}}>
            <Typography variant={"h4"}>
                {tournament ? tournament.name : <Skeleton variant="text"/>}
            </Typography>
            <Typography
                color="textSecondary"
                style={{marginTop: 8, fontSize: 20, display: 'inline-flex', alignItems: 'center'}}
            >
                <TimeIcon fontSize={"small"}/> {tournament ? formatDate(tournament.date) :
                <Skeleton variant="text" width={200}/>}
            </Typography>
            <Typography style={{marginTop: 16}}>
                {tournament
                    ? tournament.description
                    : <React.Fragment>
                        <Skeleton/>
                        <Skeleton width={"80%"}/>
                        <Skeleton width={"50%"}/>
                    </React.Fragment>}
            </Typography>


            {tournament && !hasJoinedTournament &&
            <Button
                color="primary"
                fullWidth
                variant="contained"
                style={{marginTop: 16}}
                onClick={handleJoinTournament}
            >
                join
            </Button>}

            {tournament &&
            <div style={{marginTop: 16}}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Tabs value={tabIndex} onChange={(_e, i) => setTabIndex(i)}>
                        <Tab label="Participants"/>
                        <Tab label="Teams"/>
                    </Tabs>
                    {loading ? <CircularProgress/> : <IconButton onClick={() => dispatch(getTournamentThunk(id))}>
                        <Autorenew/>
                    </IconButton>}
                </div>
                <div style={{marginTop: 16, display: "flex", flexDirection: "column"}}>
                    {tabIndex === 0
                        ? (
                            <TournamentPlayersList ownId={user?.uid} players={tournament.players} tournamentId={id}/>
                        )
                        : (
                            <React.Fragment>
                                <TeamsPreview/>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>}

        </Container>
    );
}
