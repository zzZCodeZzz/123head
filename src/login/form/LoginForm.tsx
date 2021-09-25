import React, {FC} from "react";
import {Form, Formik} from "formik";
import * as yup from "yup";
import firebase from "firebase";
import {FormikTextField} from "../../sharedComponents/FormikTextfield";
import {Button, CircularProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";

interface LoginFormState {
    email: string;
    password: string;
}

const initialValues: LoginFormState = {
    email: "",
    password: ""
}

const validationSchema = yup
    .object()
    .required()
    .shape({
        email: yup.string().email().required("required"),
        password: yup.string().required("required")
    });

export const LoginForm: FC = () => {

    const history = useHistory();
    const [loading, setLoading] = React.useState(false);

    const handleLogin = (data: { email: string, password: string }) => {

        setLoading(true);
        firebase
            .auth()
            .signInWithEmailAndPassword(
                data.email,
                data.password
            ).then((result) => {
                setLoading(false);
                history.replace("/tournaments");
        });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {({submitForm}) => (
                <Form>
                    <FormikTextField
                        name={"email"}
                        label={"Email"}
                        textFieldProps={{
                            fullWidth: true,
                            style: {marginBottom: 16},
                            variant: "outlined"
                        }}
                    />
                    <FormikTextField
                        name={"password"}
                        label={"Password"}
                        textFieldProps={{
                            fullWidth: true,
                            style: {marginBottom: 16},
                            variant: "outlined",
                            type: "password"
                        }}
                    />
                    {loading
                        ? <CircularProgress/>
                        : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={submitForm}
                            >
                                Login
                            </Button>
                        )}
                </Form>
            )}
        </Formik>
    )
}
