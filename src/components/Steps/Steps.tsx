import {Box, IconButton, InputAdornment, OutlinedInput, Typography} from '@mui/material';
import styles from '@app/pages/exercises.module.scss';
import {AddCircle, RemoveCircle} from '@mui/icons-material';
import React, {ChangeEvent, useEffect, useState} from 'react';
import FormGroup from '@app/components/FormGroup/FormGroup';

type StepBase = {
  id: number;
  val: string;
}

const step_base: StepBase = {
  id: 1,
  val: ''
};

type StepsProps = {
  onStepsChanged(steps: StepBase[]): void;
}

const Steps = ({ onStepsChanged }: StepsProps) => {
  const [steps, setSteps] = useState([step_base]);

  const handleAddStep = () => {
    setSteps(prevState => {
      return [...prevState, {
        ...step_base,
        id: prevState.length + 1
      }]
    });
    onStepsChanged(steps);
  };

  const handleRemoveStep = (id: number) => {
    setSteps(prevState => prevState.filter(step => step.id !== id));
    onStepsChanged(steps);
  }

  const handleStepChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    setSteps(prevState => {
      return prevState.map((step, i) => {
        if(index === i) {
          return {
            ...step,
            val: e.target.value
          }
        } else {
          return step;
        }
      })
    });
  }

  useEffect(() => onStepsChanged(steps), [steps]);

  return (
    <Box>
      <Typography variant="h5">
        Steps:
      </Typography>

      {steps.map((step, i) => (
        <FormGroup className={styles.formGroup} key={i}>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            placeholder={`Step ${i+1}...`}
            onChange={(e) => handleStepChange(e, i)}
            endAdornment={
              <InputAdornment position="end">
                {(steps.length - 1) === i && (
                  <IconButton edge="end" onClick={handleAddStep}>
                    <AddCircle />
                  </IconButton>
                )}

                {((steps.length - 1) === i) && (
                  <IconButton edge="end" onClick={() => handleRemoveStep(step.id)}>
                    <RemoveCircle />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </FormGroup>
      ))}
    </Box>
  )
}

export default Steps;
