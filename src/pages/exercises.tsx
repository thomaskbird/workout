import { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import {
  Grid,
  TextField,
  Button,
  FormLabel,
  Typography,
  Autocomplete,
} from '@mui/material';
import styles from './exercises.module.scss';
import {DriveFolderUpload} from '@mui/icons-material';

import {useForm, SubmitHandler} from 'react-hook-form';
import {addDoc, getDocs, QuerySnapshot} from '@firebase/firestore';
import {collectionExercises, firebaseStorage, queryAllExercisesOrdered} from '@app/services/firebase';
import {useRouter} from 'next/router';
import {makeArrayFromSnapshot} from '@app/utils/makeNewArray';
import ErrorList from '@app/components/ErrorList/ErrorList';
import Steps from '@app/components/Steps/Steps';
import {getDownloadURL, ref, uploadBytes} from '@firebase/storage';
import FormGroup from '@app/components/FormGroup/FormGroup';
import ExerciseDisplayList from '@app/components/ExerciseDisplayList/ExerciseDisplayList';

export type ExercisesInputs = {
  title: string;
  description: string;
  reps: number;
  sets: number;
  upload: FileList;
  tags: string[];
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
  sets: {
    required: true,
    minLength: {
      value: 1,
      message: 'Min number of sets 1',
    },
    maxLength: {
      value: 2,
      message: 'Max number of sets 99'
    },

  },
  reps: {
    required: true,
    minLength: {
      value: 1,
      message: 'Min number of reps is 1',
    },
    maxLength: {
      value: 4,
      message: 'Max number of reps is 9999'
    }
  },
};

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];

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
  } = useForm<ExercisesInputs>({
    resetOptions: {
    }
  });

  const onSubmit: SubmitHandler<ExercisesInputs> = async formData => {
    console.log('formData', formData);
    const baseData = {
      title: formData.title,
      description: formData.description,
      sets: formData.sets,
      reps: formData.reps,
    };

    try {
      if(formData.upload.length > 0) {
        const fileUpload = await uploadBytes(
          ref(firebaseStorage, `exercises/${(formData.upload as FileList)[0].name}`),
          (formData.upload as FileList)[0]
        );
        const fileUrl = await getDownloadURL(fileUpload.ref);
        console.log('fileUpload', fileUpload, fileUrl);

        baseData.uploads = [fileUrl];
      }

      const exerciseRef = await addDoc(collectionExercises, baseData);

      console.log('exercise', exerciseRef.id);
    } catch (e) {
      console.warn(e);
    } finally {
      router.reload();
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <h1>Exercise</h1>

        <ExerciseDisplayList exercises={exercises} />

      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h5">Add exercise</Typography>

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
            <TextField
              fullWidth
              defaultValue={0}
              type="number"
              label="Enter number of sets..."
              variant="outlined"
              {...register('sets', FIELD_RULES.sets)}
              error={errors && !!errors?.sets}
              FormHelperTextProps={{
                classes: { root: styles.root, error: styles.error },
                error: errors && !!errors?.sets
              }}
              helperText={<ErrorList field="sets" errors={errors} />}
            />
          </FormGroup>

          <FormGroup>
            <TextField
              fullWidth
              defaultValue={0}
              label="Enter number of reps per set..."
              variant="outlined"
              {...register('reps', FIELD_RULES.reps)}
              error={errors && !!errors?.reps}
              FormHelperTextProps={{
                classes: { root: styles.root, error: styles.error },
                error: errors && !!errors?.reps
              }}
              helperText={<ErrorList field="reps" errors={errors} />}
            />
          </FormGroup>

          <FormGroup>
            <Autocomplete
              multiple
              id="tags"
              options={top100Films}
              getOptionLabel={(option) => option?.title}
              filterSelectedOptions
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="Tag your exercise..."
                />
              )}
            />
          </FormGroup>

          <Steps />

          <FormGroup>
            <label htmlFor="upload">
              <TextField
                id="upload"
                fullWidth
                defaultValue={0}
                label="Select a file..."
                variant="outlined"
                {...register('upload')}
                style={{ display: 'none' }}
                type="file"
              />

              <Button color="inherit" variant="contained" startIcon={<DriveFolderUpload/>}>
                Upload image or video
              </Button>
            </label>
          </FormGroup>

          <Button type="submit" variant="contained">Submit</Button>
        </form>

      </Grid>
    </Grid>
  )
}

export default ExercisesView
