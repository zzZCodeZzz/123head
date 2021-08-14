import React, {FC} from "react";
import {DateTimePickerProps} from "@material-ui/pickers";
import {useField} from "formik";
import {DateTimePicker} from "@material-ui/pickers";

interface FormikDateTimePickerProps {
    dateTimePickerProps?: Partial<DateTimePickerProps>;
    name: string;
    label?: string;
}

export const FormikDateTimePicker: FC<FormikDateTimePickerProps> = ({
                                                                 name,
                                                                 label,
                                                                 dateTimePickerProps
                                                             }) => {

    const [, meta, helpers] = useField<Date | undefined | null>(name);

    return (
        <DateTimePicker
            label={label}
            {...dateTimePickerProps}
            value={meta.value}
            onChange={(newDate) => helpers.setValue(newDate)}
        />
    )
};
