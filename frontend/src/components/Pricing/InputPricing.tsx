import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
import { PricingInputProps } from "types/pricing.types";

const formatValue = (value: string): string => {
  return value.replace(/,/g, '.');
};

export const PricingtemInput: React.FC<PricingInputProps> = ({
  name,
  label,
  type,
  value,
}) => (
  <Field name={name}>
    {({ field, meta, form }: any) => (
      <TextField
        {...field}
        label={label}
        type={type}
        fullWidth
        margin="dense"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
        value={value}
        onChange={(e) => {
          const formattedValue = formatValue(e.target.value);
          form.setFieldValue(name, formattedValue);
        }}
      />
    )}
  </Field>
);
