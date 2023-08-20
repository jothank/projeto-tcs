import React, { useCallback, useMemo, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { ChevronRight } from '@mui/icons-material';
import { CircularProgress, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper, { Orientation } from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import useStyles from './styles';

export interface CustomStepperItem {
  id?: number;
  label: string;
  isOptional?: boolean;
  element: React.ReactElement;
  canProceed?: boolean;
  extraButton?: React.ReactElement;
  onClickNext?: (value?: any) => any;
  onFinishLoading?: boolean;
}

interface CustomStepperProps {
  steps: CustomStepperItem[];
  onDismiss: () => any;
  onFinish: () => any;
  canProceed?: boolean;
  onStepBack?: () => any;
  oritentation?: Orientation;
  hideStepsLabels?: boolean;
  floatButtonsLeft?: boolean;
  buttonNextLabel?: string;
  mainTitle?: JSX.Element;
  buttonSubmitLabel?: string;
  onFinishLoading?: boolean;
}

const DesktopStepper: React.FC<CustomStepperProps> = (
  props: CustomStepperProps,
) => {
  const {
    steps,
    onDismiss,
    onFinish,
    canProceed,
    onStepBack,
    oritentation,
    hideStepsLabels,
    floatButtonsLeft,
    buttonNextLabel,
    mainTitle,
    buttonSubmitLabel,
    onFinishLoading
  } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const classes = useStyles()
  const isStepOptional = (step: number) => {
    return steps[step].isOptional;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const isLastStep = useMemo(
    () => activeStep === steps.length - 1,
    [activeStep, steps.length],
  );

  const disableNextButton = useMemo(
    () =>
      !canProceed ||
      (steps[activeStep].canProceed !== undefined &&
        !steps[activeStep].canProceed),
    [activeStep, canProceed, steps],
  );

  const handleNext = useCallback(async () => {
    if (!isLastStep) {
      let newSkipped = skipped;
      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      const { onClickNext } = steps[activeStep];
      if (onClickNext) {
        await onClickNext();
      }

      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped(newSkipped);
    } else {
      onFinish();
    }
  }, [steps, activeStep, skipped]);

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    if (onStepBack) {
      onStepBack();
    }
  };

  const handleSkip = () => {
    if (isStepOptional(activeStep)) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      setSkipped(prevSkipped => {
        const newSkipped = new Set(prevSkipped.values());
        newSkipped.add(activeStep);
        return newSkipped;
      });
    }
  };

  return (
    <div className={classes.container}>

      <Stepper
      // alternativeLabel
        style={{ padding: '0 !important', margin: '0 !important' }}
        orientation={oritentation}
        activeStep={activeStep}
        {...(!hideStepsLabels && { className: classes.stepper })}
      >
        {steps.map((item, key) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};

          if (item.isOptional) {
            labelProps.optional = (
              <Typography variant="caption" style={{ fontSize: '10px' }}>
                Opcional
              </Typography>
            );
          }
          if (isStepSkipped(key)) {
            stepProps.completed = false;
          }
          return (
            !hideStepsLabels && (
              <Step
                style={{ marginBottom: '0.5rem' }}
                key={key}
                {...stepProps}
              >
                <StepLabel {...labelProps} StepIconProps={{
                  classes: {
                    active: classes.icon,
                    completed: classes.icon,
                    text: classes.text,
                    root: classes.root,
                  }
                }}>{item.label}</StepLabel>
              </Step>
            )
          );
        })}
      </Stepper>
      
      {/* {!hideStepsLabels && <Divider />} */}
      {mainTitle && mainTitle}
      {steps[activeStep].element}
      <div
        style={{ display: 'flex', justifyContent: 'end', height: '48px', marginTop: '1rem', marginBottom: '1rem' }}
        {...(floatButtonsLeft
          ? { className: classes.stepperActionsLeft }
          : { className: classes.stepperActionsRight })}
      >
        {steps[activeStep].extraButton}
        {activeStep === 0 ? (
          <Button
          style={{marginRight: '1rem'}}
          color="secondary"
            onClick={onDismiss}
            className={classes.button}
            variant="outlined"
          >
            Cancelar
          </Button>
        ) : (
          <Button
          style={{marginRight: '1rem'}}
          color="secondary"
            disabled={activeStep === 0}
            onClick={handleBack}
            className={classes.button}
            variant="outlined"
          >
            Voltar
          </Button>
        )}
        {isStepOptional(activeStep) && (
          <Button
          style={{marginRight: '1rem'}}
          color="secondary"
            variant="contained"

            onClick={handleSkip}
            disabled={disableNextButton}
            className={classes.button}
          >
            Pular
          </Button>
        )}

        <Button
          variant="contained"
          color="secondary"
          onClick={handleNext}
          {...(isLastStep ? { type: 'submit' } : {})}
          disabled={disableNextButton || onFinishLoading}
          endIcon={onFinishLoading ? <CircularProgress style={{ width: '20px', height: '20px', margin: '10px', color: '#a9a9a9' }} /> : <ChevronRight />}

        >
          {isLastStep
            ? buttonSubmitLabel ?? 'Enviar'
            : buttonNextLabel ?? 'Próximo'}
        </Button>
      </div>
    </div>
  );
};

export default DesktopStepper;
