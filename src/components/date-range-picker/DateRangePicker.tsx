// @mui
import {
  Paper,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormHelperText,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// hooks
import useResponsive from '../../hooks/useResponsive';
//
import { DateRangePickerProps } from './types';
import { CalendarPicker } from '@mui/lab';

// ----------------------------------------------------------------------

export default function DateRangePicker({
  title = 'Selecione os intervalo de datas',
  variant = 'input',
  //
  startDate,
  endDate,
  //
  onChangeStartDate,
  onChangeEndDate,
  //
  open,
  onClose,
  //
  isError,
}: DateRangePickerProps) {
  const isDesktop = useResponsive('up', 'md');

  const isCalendarView = variant === 'calendar';

  return (
    <Dialog
      fullWidth
      maxWidth={isCalendarView ? false : 'xs'}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          ...(isCalendarView && {
            maxWidth: 720,
          }),
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>{title}</DialogTitle>

      <DialogContent
        sx={{
          ...(isCalendarView &&
            isDesktop && {
              overflow: 'unset',
            }),
        }}
      >
        <Stack
          spacing={isCalendarView ? 3 : 2}
          direction={isCalendarView && isDesktop ? 'row' : 'column'}
          justifyContent="center"
          sx={{
            pt: 1,
            '& .MuiCalendarPicker-root': {
              ...(!isDesktop && {
                width: 'auto',
              }),
            },
          }}
        >
          {isCalendarView ? (
            <>
              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <CalendarPicker date={startDate} onChange={onChangeStartDate} />
              </Paper>

              <Paper
                variant="outlined"
                sx={{ borderRadius: 2, borderColor: 'divider', borderStyle: 'dashed' }}
              >
                <CalendarPicker date={endDate} onChange={onChangeEndDate} />
              </Paper>
            </>
          ) : (
            <>
              <DatePicker
                label="Data Inicial"
                value={startDate}
                onChange={onChangeStartDate}
                renderInput={(params) => <TextField {...params} />}
              />

              <DatePicker
                label="Data Final"
                value={endDate}
                onChange={onChangeEndDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </>
          )}
        </Stack>

        {isError && (
          <FormHelperText error sx={{ px: 2 }}>
            Data final deve ser maior que data inicial
          </FormHelperText>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancelar
        </Button>

        <Button disabled={isError} variant="contained" onClick={onClose}>
          Selecionar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
