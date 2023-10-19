import { NextPage } from 'next'
import React from 'react'
import styles from '@app/pages/exercises.module.scss';
import {Button, Grid, TextField, Typography, Autocomplete, Box} from '@mui/material';
import FormGroup from '@app/components/FormGroup/FormGroup';
import ErrorList from '@app/components/ErrorList/ErrorList';
import {SubmitHandler, useForm} from 'react-hook-form';
import {addDoc, DocumentReference, Timestamp} from '@firebase/firestore';
import {useRouter} from 'next/router';
import {collectionWorkouts} from '@app/services/firebase';
import {WorkoutType} from '@app/types/types';
import useGetExercises from '@app/hooks/useGetExercises';
import useGetWorkouts from '@app/hooks/useGetWorkouts';

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
  const { exercises, retrieveAllExercises } = useGetExercises();
  const { workouts, retrieveAllWorkouts } = useGetWorkouts();

  const exerciseOptions = exercises.map(exercise => ({ title: exercise.title, id: exercise.id }));

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
    console.log('formData', formData);
    const baseData = {
      title: formData.title,
      description: formData.description,
      exercises: formData.exercises,
      createdAt: Timestamp.now()
    };

    try {
      const workoutRef: DocumentReference<WorkoutType> = await addDoc(collectionWorkouts, baseData);
      console.log('workoutRef', workoutRef);
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

          <Button type="submit" variant="contained">Submit</Button>
        </form>
      </Grid>
    </Grid>
  )
}

export default WorkoutsView
