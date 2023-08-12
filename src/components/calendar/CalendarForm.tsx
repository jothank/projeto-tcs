import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { EventInput } from '@fullcalendar/core';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { ICalendarEvent } from '../../@types/calendar';
// components
import Iconify from '../../components/iconify';
import { ColorSinglePicker } from '../../components/color-utils';
import FormProvider, { RHFTextField, RHFSwitch } from '../../components/hook-form';
import { MobileDateTimePicker } from '@mui/x-date-pickers';


// ----------------------------------------------------------------------

type FormValuesProps = ICalendarEvent;

type Props = {
  colorOptions: string[];
  event: EventInput | null | undefined;
  range: {
    start: Date;
    end: Date;
  } | null;
  onCancel: VoidFunction;
  onDeleteEvent: VoidFunction;
  onCreateUpdateEvent: (newEvent: ICalendarEvent) => void;
};

// ----------------------------------------------------------------------

const getInitialValues = (
  event: EventInput | null | undefined,
  range: { start: Date; end: Date } | null
) => {
  const initialEvent: FormValuesProps = {
    title: '',
    description: '',
    color: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start).toISOString() : new Date().toISOString(),
    end: range ? new Date(range.end).toISOString() : new Date().toISOString(),
  };

  if (event || range) {
    return merge({}, initialEvent, event);
  }

  return initialEvent;
};

// ----------------------------------------------------------------------

export default function CalendarForm({
  event,
  range,
  colorOptions,
  onCreateUpdateEvent,
  onDeleteEvent,
  onCancel,
}: Props) {
  const hasEventData = !!event;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('*Titulo obrigatório'),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        color: data.color,
        allDay: data.allDay,
        start: data.start,
        end: data.end,
      };
      onCreateUpdateEvent(newEvent);
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const isDateError =
    !values.allDay && values.start && values.end
      ? isBefore(new Date(values.end), new Date(values.start))
      : false;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ px: 3 }}>
        <RHFTextField name="title" label="Titulo" />

        <RHFTextField name="description" label="Descricão" multiline rows={3} />

        <RHFSwitch name="allDay" label="Dia todo" />

        <Controller
          name="start"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue: Date | null) => field.onChange(newValue)}
              label="Data Inicial"
              inputFormat="DD/MM/YYYY hh:mm a"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          )}
        />
        
        <Controller
          name="end"
          control={control}
          render={({ field }) => (
            <MobileDateTimePicker
              {...field}
              onChange={(newValue: Date | null) => field.onChange(newValue)}
              label="Data Final"
              inputFormat="DD/MM/YYYY hh:mm a"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={!!isDateError}
                  helperText={isDateError && 'Data final deve ser anterior a data inicial'}
                />
              )}
            />
          )}
        />
       
        <Controller
          name="color"
          control={control}
          render={({ field }) => (
            <ColorSinglePicker
              value={field.value}
              onChange={field.onChange}
              colors={colorOptions}
            />
          )}
        />
      </Stack>

      <DialogActions>
        {hasEventData && (
          <Tooltip title="Deletar Evento">
            <IconButton onClick={onDeleteEvent}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButton>
          </Tooltip>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancelar
        </Button>

        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {hasEventData ? 'Atualizar Evento' : 'Adicionar Evento'}
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
