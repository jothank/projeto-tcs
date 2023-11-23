import React from "react";
import { Field } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
} from "@mui/material";
import { RegisterInputProps } from "types/user.type";
import { FeedstockType } from "types/Feedstock.type";

export const ProductInput: React.FC<RegisterInputProps> = ({
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
        margin="dense"
        error={meta.touched && meta.error !== undefined}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    )}
  </Field>
);

interface FeedstockSelectProps {
  label: string;
  name: string;
  feedstocks: FeedstockType[];
  value?: string;
  onChange?: (value: string, feedstock: FeedstockType) => void;
}

export const FeedstocksSelect: React.FC<FeedstockSelectProps> = ({
  label,
  name,
  feedstocks,
  value = "",
  onChange,
}) => {
  return (
    <Field name={name}>
      {({ field, form, meta }: any) => (
        <FormControl fullWidth margin="dense">
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            {...field}
            value={value}
            error={meta.touched && meta.error !== undefined}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
              if (onChange) {
                const selectedFeedstock = feedstocks.find(
                  (f) => f.id === e.target.value
                );
                onChange(e.target.value as string, selectedFeedstock!);
              }
              form.setFieldValue(name, e.target.value as string);
            }}
          >
            <MenuItem value="" disabled>
              Selecione um item
            </MenuItem>
            {feedstocks.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          {meta.touched && meta.error && (
            <FormHelperText error={true}>{meta.error}</FormHelperText>
          )}
        </FormControl>
      )}
    </Field>
  );
};
