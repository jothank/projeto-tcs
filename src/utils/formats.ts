import { isEmpty } from "./validation";


export const ONLY_NUMBERS_LETTERS_REGEX = /^[a-zA-Z0-9_.-]*$/;

const ONLY_NUMBERS_REGEX = /\d+/g;

export const ONLY_EMAIL_REGEX: RegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export const ONLY_WEBSITE =
  /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?‌​=]*)?/;

export const YOUTUBE_ONLY_ID =
  /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;

export const formatCurrency = (value = 0): string =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export const capitalizeWord = (value: string): string => {
  let result = '';
  if (typeof value === 'string') {
    result = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
  return result;
};

export const truncate = (value: string, truncateLength: number): string => {
  let slicedText = '';

  if (value) {
    if (value?.length <= truncateLength) {
      slicedText = value;
    } else {
      slicedText = `${value.slice(0, truncateLength)} ...`;
    }
  }
  return slicedText;
};

export function onlyNumbers(value: string): string {
  let result = '';
  if (!isEmpty(value)) {
    const onlyNumberValues = value.match(ONLY_NUMBERS_REGEX);
    result = onlyNumberValues ? onlyNumberValues.join('') : '';
  }
  return result;
}

export const zeroIfNoValue = (value: any): number => {
  let result;
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value) || value === null || value === undefined) {
    result = 0;
  } else {
    result = value;
  }
  return result;
};

export const convertBytes = (filesize: number): string => {
  let sizeFormatted = '';
  let sizeRounded;
  if (filesize >= 1048576) {
    sizeRounded = Math.round(filesize / 1048576);
    sizeFormatted = `${sizeRounded} MB`;
  } else if (filesize >= 1024) {
    sizeRounded = Math.round(filesize / 1024);
    sizeFormatted = `${sizeRounded} KB`;
  } else {
    sizeRounded = filesize;
    sizeFormatted = `${sizeRounded} Bytes`;
  }
  return sizeFormatted;
};

export const groupArrayBy = (array: any[], property: string) => {
  const value = array.reduce((total, item) => {
    const key = item[property];
    total[key] = (total[key] || []).concat(item);

    return total;
  }, {});

  return value;
};

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
};

export const jwtDecode = (token: string): any => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(item => {
        return `%${`00${item.charCodeAt(0).toString(16)}`.slice(-2)}`;
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

export const sanitizeString = (value: string) => value.replace(/\D/g, '');

export const removeProperty =
  (prop: any) =>
  ({ [prop]: _, ...rest }) =>
    rest;

export const getYoutubeVideoId = (url: string): string | null => {
  const match = url.match(YOUTUBE_ONLY_ID);
  return match && match[2].length === 11 ? match[2] : null;
};

export const getYoutubeEmbed = (url: string): string | null => {
  const videoId = getYoutubeVideoId(url);
  return !isEmpty(videoId)
    ? `www.youtube.com/embed/${videoId}`
    : 'Vídeo Não encontrado';
};

export const removeSpecialChar = (value: string) => {
  if (value) {
    const string = value.replace(/[^\w ]/, '');
    string?.toLowerCase();

    return string;
  }
};

export const clearChar = (especialChar: string) => {
  if (especialChar) {
    especialChar = especialChar.replace(/[áàãâä]/iu, 'a');
    especialChar = especialChar.replace(/[ÁÀÃÂ]/iu, 'A');
    especialChar = especialChar.replace(/[éèêë]/iu, 'e');
    especialChar = especialChar.replace(/[ÉÈÊ]/iu, 'E');
    especialChar = especialChar.replace(/[íìîï]/iu, 'i');
    especialChar = especialChar.replace(/[ÌÍÎ]/iu, 'I');
    especialChar = especialChar.replace(/[óòõôö]/iu, 'o');
    especialChar = especialChar.replace(/[ÓÔÕÒ]/iu, 'O');
    especialChar = especialChar.replace(/[úùûü]/iu, 'u');
    especialChar = especialChar.replace(/[ÙÚÛ]/iu, 'U');
    especialChar = especialChar.replace(/[ç]/iu, 'c');
    especialChar = especialChar.replace(/[Ç]/iu, 'C');
    especialChar = especialChar.replace(/[/]/iu, '');
    especialChar = especialChar.replace(/[-]/iu, '');
    especialChar = especialChar.replace(/\./g, '');

    return especialChar.toUpperCase();
  }
};

