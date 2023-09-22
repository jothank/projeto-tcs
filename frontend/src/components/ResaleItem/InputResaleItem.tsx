import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
import { ResaleItemInputProps } from "types/resaleItem.types";

export const ResaleItemInput: React.FC<ResaleItemInputProps> = ({
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
        />
      )}
    </Field>
  );