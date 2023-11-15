import VideoPlayer from '@app/components/VideoPlayer/VideoPlayer';
import useWorkouts from '@app/hooks/useWorkouts';
import { ExerciseStepType } from '@app/types/types';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const DoWorkout: NextPage = () => {
  const router = useRouter();
  const {workoutId} = router.query;
  const {workout} = useWorkouts(workoutId as string);

  const [activeStep, setActiveStep] = useState(0);

  const exercises = workout?.exercises;
  const lastExerciseIndex = (exercises ?? []).length - 1;

  console.log(workout);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9}>
        <Box>
          <Stepper activeStep={activeStep} orientation="vertical">
            {(exercises ?? []).map((step, index) => (
              <Step key={step.id}>
                <StepLabel
                  optional={
                    index === lastExerciseIndex ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.title}<br/> <Typography variant="caption">{step.description}</Typography>
                </StepLabel>
                
                <StepContent>
                  <Grid container>
                    <Grid md={5}>
                      <VideoPlayer
                        url={step.video}
                        thumbnail={step.thumbnail}
                      />
                    </Grid>
                    <Grid md={7}>
                      <ol>
                      {(step.steps ?? []).map((exerciseStep: ExerciseStepType) => (
                        <li key={exerciseStep.id}>{exerciseStep.val}</li>
                      ))}
                      </ol>
                    </Grid>
                  </Grid>

                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === lastExerciseIndex ? 'Finish' : 'Continue'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                  
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === (exercises ?? []).length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>All steps completed - you&apos;re finished</Typography>
              <Button onClick={() => setActiveStep(0)} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={3} flexDirection="column">
        <ol>
          <li>Intro that has the workout title and description with list of all exercises etc and get started button</li>
          <li>A count down from 3 to 1 then start a timer. </li>
          <li>The timer should always stay visible and is a representation of the current point in the exercise</li>
          <li>The stepper will show each exercise as the workout progresses through each step</li>
          <li>All steps should have a rest period</li>
          <li>The stepper should auto progress to next step after duration expires unless it is a set and reps workout then it will have buttons for the user to manually progress the workout.</li>
          <li>Should record each workout and save to the users history</li>
        </ol>
      </Grid>
    </Grid>
  );
}

export default DoWorkout;