import React, {FC} from "react";
import {Form, Formik} from "formik";
import * as yup from "yup";
import firebase from "firebase";
import {FormikTextField} from "../../sharedComponents/FormikTextfield";
import {Button, CircularProgress} from "@material-ui/core";
import {useHistory} from "react-router-dom";

interface LoginFormState {
    userEmail: string;
    displayName: string;
    userPassword: string;
    passwordConfirmation: string;
}

const initialValues: LoginFormState = {
    userEmail: "",
    displayName: "",
    userPassword: "",
    passwordConfirmation: ""
}

const validationSchema = yup
    .object()
    .shape({
        userEmail: yup.string().email("not a correct email").required("required"),
        displayName: yup.string().required("required").min(2, "to short"),
        userPassword: yup.string().required("required"),
        passwordConfirmation: yup.string().required("required")
            .oneOf([yup.ref('userPassword'), null], 'passwords must match')
    });

export const SignUpForm: FC = () => {

    const history = useHistory();
    const [loading, setLoading] = React.useState(false);

    const handleSignUp = (data: { userEmail: string, userPassword: string, displayName: string }) => {
        setLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                data.userEmail,
                data.userPassword
            )
            .then((result) => {
                result.user?.updateProfile({displayName: data.displayName})
                setLoading(false);
                history.replace("/tournaments");
            });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
        >
            {({submitForm}) => (
                <Form>
                    <FormikTextField
                        name={"userEmail"}
                        label={"Email"}
                        textFieldProps={{
                            fullWidth: true,
                            style: {marginBottom: 16},
                            variant: "outlined"
                        }}
                    />
                    <FormikTextField
                        name={"displayName"}
                        label={"Display Name"}
                        textFieldProps={{
                            fullWidth: true,
                            style: {marginBottom: 16},
                            variant: "outlined"
                        }}
                    />
                    <FormikTextField
                        name={"userPassword"}
                        label={"Password"}
                        textFieldProps={{
                            fullWidth: true,
                            style: {marginBottom: 16},
                            variant: "outlined",
                            type: "password"
                        }}
                    />
                    <FormikTextField
                        name={"passwordConfirmation"}
                        label={"Confirm Password"}
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
                                SignUp
                            </Button>
                        )}
                </Form>
            )}
        </Formik>
    )
}
