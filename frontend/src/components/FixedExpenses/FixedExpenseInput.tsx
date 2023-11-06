import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";

interface FormInputNumberProps {
  name: string;
  label: string;
  type: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormInputNumber: React.FC<FormInputNumberProps> = ({
  name,
  label,
  type,
  onChange,
}) => (
  <Field name={name}>
    {({ field, meta, form }: any) => (
      <TextField
        {...field}
        label={label}
        type={type}
        fullWidth
        margin="dense"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          form.setFieldValue(field.name, target.value);
          if (onChange) {
            onChange(e);
          }
        }}
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);

export { FormInputNumber };
