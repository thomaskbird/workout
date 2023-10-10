import {Box, IconButton, InputAdornment, OutlinedInput, Typography} from '@mui/material';
import styles from '@app/pages/exercises.module.scss';
import {AddCircle, RemoveCircle} from '@mui/icons-material';
import React, {useState} from 'react';
import FormGroup from '@app/components/FormGroup/FormGroup';

const step_base = {
  id: 1,
  val: ''
};

const Steps = () => {
  const [steps, setSteps] = useState([step_base]);
  const [lastStepId, setLastStepId] = useState(1);

  const handleAddStep = () => {
    setSteps(prevState => {
      return [...prevState, {
        ...step_base,
        id: lastStepId + 1
      }]
    });
    setLastStepId(prevState => prevState + 1);
  };

  const handleRemoveStep = (id: number) => {
    setSteps(prevState => prevState.filter(step => step.id !== id));
    setLastStepId(prevState => prevState - 1);
  }

  return (
    <Box>
      <Typography variant="h5">
        Steps:
      </Typography>

      {steps.map(step => (
        <FormGroup className={styles.formGroup} key={step.id}>
          <OutlinedInput
            id="outlined-adornment-password"
            type="text"
            placeholder={`Step ${step.id}`}
            endAdornment={
              <InputAdornment position="end">
                {steps.length === step.id && (
                  <IconButton edge="end" onClick={handleAddStep}>
                    <AddCircle />
                  </IconButton>
                )}
                {steps.length === step.id && steps.length !== 1 && (
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
