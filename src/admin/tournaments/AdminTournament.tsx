import React, {FC} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/types";
import {selectTournamentById} from "./redux/tournaments.slice";
import {getTournamentThunk} from "./redux/tournaments.thunk";
import {Typography} from "@material-ui/core";
import {format} from "date-fns";

export const AdminTournament: FC = () => {

    const dispatch = useAppDispatch();

    const {id} = useParams<{ id: string }>();

    React.useEffect(() => {
        dispatch(getTournamentThunk(id));
    }, [dispatch, id]);

    const tournament = useAppSelector((state) => selectTournamentById(state, id));

    return (
        <div>
            <Typography variant={"h4"}>
                {tournament?.name}
            </Typography>
            <Typography>
                {tournament?.description}
            </Typography>
            <Typography>
               {tournament && format(tournament.date, "dd.mm.yyyy HH:mm")}
            </Typography>
        </div>
    )
}
