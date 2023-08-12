import orderBy from 'lodash/orderBy';
import { EventInput } from '@fullcalendar/core';
// @mui
import {
  Box,
  Stack,
  Drawer,
  Divider,
  Tooltip,
  TextField,
  Typography,
  IconButton,
  ListItemText,
  ListItemButton,
} from '@mui/material';
// utils
import { fDateTime } from '../../utils/formatTime';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { DateRangePickerProps } from '../../components/date-range-picker';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DateFnsUtils from "@date-io/date-fns";
import { ptBR } from "date-fns/locale";

// ----------------------------------------------------------------------

type Props = {
  openFilter: boolean;
  events: EventInput[];
  onResetFilter: VoidFunction;
  onCloseFilter: VoidFunction;
  colorOptions?: string[];
  filterEventColor: string[];
  picker: DateRangePickerProps;
  onSelectEvent: (eventId: string) => void;
  onFilterEventColor: (eventColor: string) => void;
};

export default function CalendarFilterDrawer({
  events,
  picker,
  openFilter,
  onCloseFilter,
  onResetFilter,
  onSelectEvent,
}: Props) {
  const notDefault = (picker.startDate && picker.endDate);

  return (
    <Drawer
      anchor="right"
      open={openFilter}
      onClose={onCloseFilter}
      BackdropProps={{
        invisible: true,
      }}
      PaperProps={{
        sx: { width: 320 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pl: 2, pr: 1, py: 2 }}
      >
        <Typography variant="subtitle1">Filtros</Typography>

        <Tooltip title="Limpar">
          <Box sx={{ position: 'relative' }}>
            <IconButton onClick={onResetFilter}>
              <Iconify icon="ic:round-refresh" />
            </IconButton>

            {notDefault && (
              <Box
                sx={{
                  top: 6,
                  right: 4,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  position: 'absolute',
                  bgcolor: 'error.main',
                }}
              />
            )}
          </Box>
        </Tooltip>
      </Stack>

      <Divider />

      <Typography
        variant="caption"
        sx={{
          p: 2,
          color: 'text.secondary',
          fontWeight: 'fontWeightMedium',
        }}
      >
        Intervalo de tempo
      </Typography>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <Stack spacing={2} sx={{ px: 2 }}>
        <DatePicker
          label="Data Inicial"
          value={picker.startDate}
          onChange={picker.onChangeStartDate}
          renderInput={(params) => <TextField size="small" {...params} />}
        />

        <DatePicker
          label="Data Final"
          value={picker.endDate}
          onChange={picker.onChangeEndDate}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
              error={picker.isError}
              helperText={picker.isError && 'Data final não pode ser anterior a data inicial'}
            />
          )}
        />
      </Stack>
      </LocalizationProvider> 

      <Typography
        variant="caption"
        sx={{
          p: 2,
          color: 'text.secondary',
          fontWeight: 'fontWeightMedium',
        }}
      >
        Eventos ({events.length})
      </Typography>

      <Scrollbar sx={{ height: 1 }}>
        {orderBy(events, ['end'], ['desc']).map((event) => (
          <ListItemButton
            key={event.id}
            onClick={() => onSelectEvent(event.id as string)}
            sx={{ py: 1.5, borderBottom: (theme) => `dashed 1px ${theme.palette.divider}` }}
          >
            <Box
              sx={{
                top: 16,
                left: 0,
                width: 0,
                height: 0,
                position: 'absolute',
                borderRight: '10px solid transparent',
                borderTop: `10px solid ${event.color}`,
              }}
            />

            <ListItemText
              disableTypography
              primary={
                <Typography variant="subtitle2" sx={{ fontSize: 13, mt: 0.5 }}>
                  {event.title}
                </Typography>
              }
              secondary={
                <Typography
                  variant="caption"
                  component="div"
                  sx={{ fontSize: 11, color: 'text.disabled' }}
                >
                  {event.allDay ? (
                    fDateTime(event.start as Date, 'dd MMM yy')
                  ) : (
                    <>
                      {`${fDateTime(event.start as Date, 'dd MMM yy p')} - ${fDateTime(
                        event.end as Date,
                        'dd MMM yy p'
                      )}`}
                    </>
                  )}
                </Typography>
              }
              sx={{ display: 'flex', flexDirection: 'column-reverse' }}
            />
          </ListItemButton>
        ))}
      </Scrollbar>
    </Drawer>
  );
}
