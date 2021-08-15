import {Form, Formik} from "formik";
import React, {FC} from "react";
import {useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {FormikTextField} from "../../../sharedComponents/FormikTextfield";
import * as yup from "yup";
import {FormikDateTimePicker} from "../../../sharedComponents/FormikDateTimePicker";

export interface NewTournamentState {
    date: Date,
    name: string;
    description?: string;
}

const initialValues: NewTournamentState = {
    date: new Date(),
    name: ""
}

const validationSchema = yup
    .object()
    .required()
    .shape({
        name: yup.string().required("required").min(3, "to short"),
        description: yup.string().notRequired(),
        date: yup.date().defined()
    })

interface NewTournamentFormDialogProps {
    onSubmit: (t: NewTournamentState) => void;
    loading: boolean;

}

export const NewTournamentFormDialog: FC<NewTournamentFormDialogProps> = ({onSubmit, loading}) => {
    const history = useHistory();
    const location = useLocation();
    console.log("loc", location);
    const {path} = useRouteMatch();
    return (
        <Dialog open={location.hash === "#new-tournament"}>
            <DialogTitle>New Tournament</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {({submitForm}) => (
                        <Form>
                            <FormikTextField
                                name={"name"}
                                label={"Name"}
                                textFieldProps={{fullWidth: true, style: {marginBottom: 16}}}
                            />
                            <FormikDateTimePicker
                                label={"Date"}
                                dateTimePickerProps={{fullWidth: true, style: {marginBottom: 16}}}
                                name={"date"}
                            />
                            <FormikTextField
                                name={"description"}
                                label={"Description"}
                                textFieldProps={{
                                    fullWidth: true,
                                    multiline: true,
                                    style: {marginBottom: 32}
                                }}
                            />
                            {loading
                                ? <CircularProgress/>
                                : (
                                    <DialogActions>
                                        <Button onClick={() => history.replace({pathname: path, hash: undefined})}>
                                            cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={submitForm}
                                        >
                                            Create Tournament
                                        </Button>
                                    </DialogActions>
                                )}
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
