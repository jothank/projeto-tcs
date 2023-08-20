import { toPattern } from 'vanilla-masker';
import { isEmpty } from './validation';


export const removeMask = (value: any) => String(value)?.replace(/\W/g, '');

const setMask = (value: any, pattern: any, options: any) =>
  toPattern(value, { pattern, ...options });

const setMultipleMask = (value: any, patterns: any, options: any) =>
  setMask(
    value,
    patterns.reduce(
      (memo: any, pattern: any) =>
        value.length <= removeMask(memo).length ? memo : pattern,
      patterns[0],
    ),
    options,
  );

export const mask = (value: any, pattern: any, options?: any) =>
  typeof pattern === 'string'
    ? setMask(value, pattern || '', options)
    : setMultipleMask(value, pattern, options);

export function setCpfCnpjMask(value: string): string {
  const unmaskedValue: string = removeMask(value);
  let result = '';
  if (!isEmpty(unmaskedValue)) {
    result = mask(unmaskedValue, ['999.999.999-99', '99.999.999/9999-99']);
  }
  return result;
}

export function setCpfMask(value: string): string {
  const unmaskedValue: string = removeMask(value);
  let result = '';
  if (!isEmpty(unmaskedValue)) {
    result = mask(unmaskedValue, '999.999.999-99');
  }
  return result;
}

export function setPhoneMask(value: string): string {
  const unmaskedValue: string = removeMask(value);
  let result = '';
  if (!isEmpty(unmaskedValue)) {
    result = mask(unmaskedValue, ['99999999999', '999999999']);
  }
  return result;
}

export const cpfMask = (value: string): string => {
  return value! && value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const phoneMask = (value: string): string => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
};

export const zipCodeMask = (value : string) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{5})(\d)/,'$1-$2')
  return value
}

export const removeNonDigits = (value: string): string =>
  value.replace(/\D/g, '');
