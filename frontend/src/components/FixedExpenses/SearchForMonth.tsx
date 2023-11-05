import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { optionsMonth } from 'utils/FixedExpenseMonth';

const SearchForMonth = () => {
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Grid
    sx={{width: "100%"}}
    >
    <FormControl>
      <InputLabel>Mês</InputLabel>
      <Select
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        {optionsMonth.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </Grid>
  );
};

export default SearchForMonth;
