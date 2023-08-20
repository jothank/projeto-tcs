/* eslint-disable react/require-default-props */
import React, { forwardRef, Ref, ReactElement } from 'react';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';


const DefaultDialogTransition = forwardRef(function Transition(
  props: any & { children?: ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DefaultDialogTransition;
