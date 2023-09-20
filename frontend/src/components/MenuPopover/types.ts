import { PopoverProps } from '@mui/material';

export type MenuPopoverArrowValue =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

  export interface MenuItem {
    label: string;
    onClick: () => void;
    modalComponent?: React.ReactNode; 
  }

export interface MenuPopoverProps extends Omit<PopoverProps, 'open'> {
  open: HTMLElement | null;
  arrow?: MenuPopoverArrowValue;
  disabledArrow?: boolean;
  menuItems: MenuItem[];
}
