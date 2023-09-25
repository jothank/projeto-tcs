import React from "react";
import { Field } from "formik";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { FeedstockInputProps, SelectFieldProps } from "types/Feedstock.type";

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
            onChange={(e) => form.setFieldValue(name, e.target.value)}
          >
            {optionValues.map((optionValue) => (
              <MenuItem key={optionValue} value={optionValue}>
                {optionValue}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error ? (
            <FormHelperText error={true}>{meta.error}</FormHelperText>
          ) : null}
        </FormControl>
      )}
    </Field>
  );
};
