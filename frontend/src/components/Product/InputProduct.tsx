import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { ProductInputProps, SelectFieldProps } from "types/Product.types";

export const ProductInput: React.FC<ProductInputProps> = ({
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

export const ProductSelect: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}) => {
  const optionValues = options.map((option) => option.value);
  return (
    <Field name={name}>
      {({ field, form, meta }: any) => (
        <FormControl fullWidth margin="dense">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            {...field}
            error={meta.touched && meta.error !== undefined}
            helperText={meta.touched && meta.error ? meta.error : ""}
            onChange={(e) => form.setFieldValue(name, e.target.value)}
          >
            {optionValues.map((optionValue) => (
              <MenuItem key={optionValue} value={optionValue}>
                {optionValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Field>
  );
};

export const ProductFeedstockSelect: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: any) => (
        <FormControl
          fullWidth
          margin="dense"
          error={meta.touched && !!meta.error}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={field.value}
            onChange={(e) => form.setFieldValue(name, e.target.value)}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <FormHelperText>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};
