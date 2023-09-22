import React from "react";
import { Field } from "formik";
import { RegisterInputProps } from "types/user.type";
import { TextField } from "@mui/material";

const FormInput: React.FC<RegisterInputProps> = ({ name, label, type }) => (
  <Field name={name}>
    {({ field, meta }: any) => (
      <TextField
        {...field}
        label={label}
        type={type}
        fullWidth
        margin="dense"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);

export { FormInput };
