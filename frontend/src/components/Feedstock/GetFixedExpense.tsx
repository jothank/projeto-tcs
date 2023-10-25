import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function MesSelector({ onMonthChange }: { onMonthChange: (month: string) => void }) {
  const [selectedMonth, setSelectedMonth] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value as string;
    setSelectedMonth(selected);
    onMonthChange(selected);
  };

  return (
    <Box sx={{ 
        minWidth: 120,
        width: "30%",
        marginLeft: "65%"
        }}>
      <FormControl fullWidth>
        <InputLabel id="mes-selector-label">Mês</InputLabel>
        <Select
          labelId="mes-selector-label"
          id="mes-selector"
          value={selectedMonth}
          label="Mês"
          onChange={handleChange}
        >
          <MenuItem value="janeiro">Janeiro</MenuItem>
          <MenuItem value="fevereiro">Fevereiro</MenuItem>
          <MenuItem value="marco">Março</MenuItem>
          <MenuItem value="abril">Abril</MenuItem>
          <MenuItem value="maio">Maio</MenuItem>
          <MenuItem value="junho">Junho</MenuItem>
          <MenuItem value="julho">Julho</MenuItem>
          <MenuItem value="agosto">Agosto</MenuItem>
          <MenuItem value="setembro">Setembro</MenuItem>
          <MenuItem value="outubro">Outubro</MenuItem>
          <MenuItem value="novembro">Novembro</MenuItem>
          <MenuItem value="dezembro">Dezembro</MenuItem>
         
        </Select>
      </FormControl>
    </Box>
  );
}
