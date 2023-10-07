import { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import {FormGroup, Grid, TextField, Button, FormLabel} from '@mui/material';
import styles from './exercises.module.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import {addDoc, getDocs, QuerySnapshot} from '@firebase/firestore';
import {collectionExercises, queryAllExercisesOrdered} from '@app/services/firebase';
import {useRouter} from 'next/router';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
// import FormGroup from '@app/components/FormGroup/FormGroup';

type Inputs = {
  title: string;
  description: string;
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
  }
}

const ExercisesView: NextPage = () => {
  const router = useRouter();

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const retrieveAllExercises = async () => {
      const exercisesSnap: QuerySnapshot = await getDocs(queryAllExercisesOrdered);
      const exercisesRecordsFromDb = makeArrayFromSnapshot(exercisesSnap);
      setExercises(exercisesRecordsFromDb);
    }

    retrieveAllExercises();
  }, []);

  // todo: Figure out how to reset form and errors on keystroke
  //   https://react-hook-form.com/docs/useform#resetOptions
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    resetOptions: {
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    console.log('formData', formData);

    const exerciseRef = await addDoc(collectionExercises, {
      title: formData.title,
      description: formData.description
    });

    console.log('exercise', exerciseRef.id);
    router.reload();
  }

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h1>Exercise</h1>

          <ul>
            {exercises.map((exercise) => (
              <li key={exercise.id}>{exercise.title}</li>
            ))}
          </ul>

        </Grid>
        <Grid item xs={12} md={4}>
          <h3>Sidebar</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <FormLabel>Title:</FormLabel>
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
                helperText={FIELD_RULES.title.minLength.message}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Description:</FormLabel>
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
                helperText={FIELD_RULES.description.minLength.message}
              />
            </FormGroup>

            <Button type="submit" variant="contained">Submit</Button>
          </form>

        </Grid>
      </Grid>
  )
}

export default ExercisesView
