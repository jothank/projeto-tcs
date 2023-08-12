import { format, getTime, formatDistanceToNow, parse } from 'date-fns';
import fromUnixTime from 'date-fns/fromUnixTime';
import { ptBR } from 'date-fns/locale'
import numeral from 'numeral';
// ----------------------------------------------------------------------

type InputValue = Date | string | number | null;



export function fromUnixDate(unixValue: number) {
  const msToS = unixValue! * 1000
  const date = fromUnixTime(msToS) 
  const dataFormat = 'dd MMM yyyy';
  console.log("date",date)
  return format(new Date(date), dataFormat, {locale: ptBR});
}


export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy';
  return date ? format(new Date(date), fm, {locale: ptBR}) : '';
}

export const fParse = (date: string) => {
  return parse(date, 'dd/MM/yyyy HH:mm', new Date()).toISOString()
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm , {locale: ptBR}) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}



export function fNumber(number: InputValue) {
  return numeral(number).format();
}

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
