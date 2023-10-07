import { NextPage } from 'next'
import React from 'react'
import {FormGroup, Grid, TextField, Button, FormLabel} from '@mui/material';
import styles from './exercises.module.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import {addDoc} from '@firebase/firestore';
import {collectionExercises} from '@app/services/firebase';
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
  // todo: Figure out how to reset form and errors on keystroke
  //   https://react-hook-form.com/docs/useform#resetOptions
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>({
    resetOptions: {
      keepErrors: false
    }
  });

  const onSubmit: SubmitHandler<Inputs> = async formData => {
    console.log('formData', formData);

    const exerciseRef = await addDoc(collectionExercises, {
      title: formData.title,
      description: formData.description
    });

    console.log('exercise', exerciseRef.id);
  }

  return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <h1>Exercise</h1>
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
                  classes: styles.root,
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
                  classes: styles.root,
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
