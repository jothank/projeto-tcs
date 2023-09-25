import React from "react";
import { Field } from "formik";
import { TextField } from "@mui/material";
import { FeedstockInputProps, SelectFieldProps } from "types/Feedstock.type";
import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";

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
        value={field.value === 0 ? '' : field.value} 
      />
    )}
  </Field>
);


export const FeedstockSelect: React.FC<SelectFieldProps> = ({
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
