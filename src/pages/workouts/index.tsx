import DisplayList from '@app/components/DisplayList/DisplayList';
import ErrorList from '@app/components/ErrorList/ErrorList';
import FormGroup from '@app/components/FormGroup/FormGroup';
import ListItemWorkout from '@app/components/ListItemWorkout/ListItemWorkout';
import useExercises from '@app/hooks/useExercises';
import useWorkouts from '@app/hooks/useWorkouts';
import styles from '@app/pages/workouts/index.module.scss';
import { selectUser } from '@app/store/selectors/session';
import { useSession } from '@app/store/useSession';
import { Timestamp } from '@firebase/firestore';
import { Autocomplete, Box, Button, Grid, TextField, Typography } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export type WorkoutInputs = {
  title: string;
  description: string;
  exercises: any;
}

const FIELD_RULES = {
  title: {
    required: true,
    minLength: {
      value: 2,
      message: 'Min length is 2 characters.',
    },
  },
  description: {
    required: true,
    minLength: {
      value: 10,
      message: 'Min length is 10 characters.',
    },
  },
  exercises: {
    required: true,
  }
};

const WorkoutsView: NextPage = () => {
  const router = useRouter();
  const user = useSession(selectUser);
  const { exercises } = useExercises();
  const { isLoading: isLoadingWorkouts, workouts, addWorkouts, retrieveAllWorkouts } = useWorkouts();

  useEffect(() => { retrieveAllWorkouts() }, []);

  const exerciseOptions = exercises.map(exercise => ({ id: exercise.id, title: exercise.title, createdAt: exercise.createdAt }));

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<WorkoutInputs>({
    resetOptions: {
    }
  });

  const onSubmit: SubmitHandler<WorkoutInputs> = async formData => {
    const baseData = {
      title: formData.title,
      description: formData.description,
      exercises: formData.exercises,
      createdAt: Timestamp.now()
    };

    try {
      const workoutRef = await addWorkouts(baseData);
    } catch (e) {
      console.warn(e);
    } finally {
      router.reload();
    }
  }

  return (
    <Grid container spacing={2} className={styles.exerciseWrapper}>
      <Grid item xs={12} md={9} className={styles.exerciseDisplayWrapper}>
        <h1>Workouts</h1>

        {workouts.length ? (
          <DisplayList
            items={workouts}
            renderChild={(workout) =>
              <ListItemWorkout key={workout.id} workout={workout} />
            }
          />
        ) : (
          <Typography>No workouts, create one?</Typography>
        )}
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h5">Add workout</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              fullWidth
              defaultValue={null}
              label="Enter title..."
              variant="outlined"
              {...register('title', FIELD_RULES.title)}
              error={errors && !!errors?.title}
              FormHelperTextProps={{
                classes: { root: styles.root, error: styles.error },
                error: errors && !!errors?.title
              }}
              helperText={<ErrorList field="title" errors={errors} />}
            />
          </FormGroup>

          <FormGroup>
            <TextField
              fullWidth
              multiline
              rows={4}
              defaultValue={null}
              label="Enter description..."
              variant="outlined"
              {...register('description', FIELD_RULES.description)}
              error={errors && !!errors?.description}
              FormHelperTextProps={{
                classes: { root: styles.root, error: styles.error },
                error: errors && !!errors?.title
              }}
              helperText={<ErrorList field="description" errors={errors} />}
            />
          </FormGroup>

          <FormGroup>
            <Autocomplete
              multiple
              id="tags-outlined"
              filterSelectedOptions
              options={exerciseOptions}
              {...register('exercises')}
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, state, ownerState) => (
                <Box component="li" {...props} key={option.id}>{ownerState.getOptionLabel(option)}</Box>
              )}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Exercises"
                  placeholder="Select exercises..."
                />
              )}
              onChange={(e, val) => setValue('exercises', val)}
            />
          </FormGroup>

          <Button disabled={isLoadingWorkouts} type="submit" variant="contained">Submit</Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default WorkoutsView
