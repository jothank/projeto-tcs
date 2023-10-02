import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
import { FeedstockInputProps } from "types/Feedstock.type";

export const FeedstockInput: React.FC<FeedstockInputProps> = ({
  name,
  label,
  type,
}) => (
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
        placeholder={label}
        value={field.value === 0 ? "" : field.value}
      />
    )}
  </Field>
);
