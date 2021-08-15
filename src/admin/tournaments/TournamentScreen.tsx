import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/types";
import {selectTournamentById} from "./redux/tournaments.slice";
import {getTournamentThunk} from "./redux/tournaments.thunk";
import {AppBar, Container, Divider, IconButton, Tab, Tabs, Typography} from "@material-ui/core";
import {format} from "date-fns";
import {Autorenew, Schedule as TimeIcon} from "@material-ui/icons";
import {UserPreview} from "../users/UserPreview";
import {TeamsPreview} from "./TeamsPreview";

export const TournamentScreen: FC = () => {

    const dispatch = useAppDispatch();

    const [tabIndex, setTabIndex] = React.useState(0);

    const {id} = useParams<{ id: string }>();

    React.useEffect(() => {
        dispatch(getTournamentThunk(id));
    }, [dispatch, id]);

    const tournament = useAppSelector((state) => selectTournamentById(state, id));

    return (
        <Container style={{paddingTop: 16}}>
            <Typography variant={"h4"}>
                {tournament?.name}
            </Typography>
            <Typography color="textSecondary"
                        style={{marginTop: 8, fontSize: 20, display: 'inline-flex', alignItems: 'center'}}>
                <TimeIcon fontSize={"small"}/> {tournament && format(tournament.date, "dd.MM.yyyy HH:mm")}
            </Typography>
            <Typography style={{marginTop: 16}}>
                {tournament?.description}
            </Typography>
            <div style={{marginTop: 16}}>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Tabs value={tabIndex} onChange={(_e, i) => setTabIndex(i)}>
                        <Tab label="Participants"/>
                        <Tab label="Teams"/>
                    </Tabs>
                    <IconButton>
                        <Autorenew/>
                    </IconButton>
                </div>
                <div style={{marginTop: 16, display: "flex", flexDirection: "column"}}>
                    {tabIndex === 0
                        ? (
                        <React.Fragment>
                        <UserPreview/>
                        <UserPreview/>
                        <UserPreview/>
                    </React.Fragment>
                    )
                     : (
                         <React.Fragment>
                             <TeamsPreview/>
                         </React.Fragment>
                        )
                    }
                </div>
            </div>
        </Container>
    );
}
