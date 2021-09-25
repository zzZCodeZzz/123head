import React, {FC} from "react";
import {TextField, TextFieldProps} from "@material-ui/core";
import {useField} from "formik";

interface FormikTextFieldProps {
    textFieldProps?: TextFieldProps;
    name: string;
    label?: string;
}

export const FormikTextField: FC<FormikTextFieldProps> = ({
                                                       textFieldProps,
                                                       name,
                                                       label
                                                   }) => {
    const [, meta, helpers] = useField<string | undefined>(name);

    return (
        <TextField
            {...textFieldProps}
            label={label}
            value={meta.value ?? ""}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            onChange={(e) => helpers.setValue(e.target.value)}
        />
    )
}
