import { NextPage } from 'next'
import React, {useEffect, useState} from 'react'
import { v4 as uuid } from 'uuid';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from '@mui/material';
import styles from './index.module.scss';
import {DriveFolderUpload} from '@mui/icons-material';

import {useForm, SubmitHandler} from 'react-hook-form';
import {Timestamp} from '@firebase/firestore';
import {firebaseStorage} from '@app/services/firebase';
import {useRouter} from 'next/router';
import ErrorList from '@app/components/ErrorList/ErrorList';
import Steps from '@app/components/Steps/Steps';
import {getDownloadURL, ref, uploadBytes} from '@firebase/storage';
import FormGroup from '@app/components/FormGroup/FormGroup';
import useExercises from '@app/hooks/useExercises';
import {ExerciseType, TagType} from '@app/types/types';
import ListItemExercise from '@app/components/ListItemExercise/ListItemExercise';
import DisplayList from '@app/components/DisplayList/DisplayList';
import useTags from '@app/hooks/useTags';
import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';

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

const ExercisesView: NextPage = () => {
  const router = useRouter();
  const user = useSession(selectUser);
  const { exercises, retrieveAllExercises, addExercise } = useExercises();
  const { tags, addTag } = useTags();
  console.log('tags', tags);

  const [selectedTags, setSelectedTags] = useState([]);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    retrieveAllExercises()
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
    const baseData: Omit<ExerciseType, 'id'> = {
      title: formData.title,
      description: formData.description,
      sets: formData.sets,
      reps: formData.reps,
      createdAt: Timestamp.now()
    };

    try {
      if(formData.upload.length > 0) {
        const fileUpload = await uploadBytes(
          ref(firebaseStorage, `exercises/${(formData.upload as FileList)[0].name}`),
          (formData.upload as FileList)[0]
        );
        const fileUrl = await getDownloadURL(fileUpload.ref);
        baseData.uploads = [fileUrl];
      }

      if(steps.length) {
        baseData.steps = steps;
      }

      const exerciseRef = await addExercise(baseData);
      console.log('exercise', exerciseRef);
    } catch (e) {
      console.warn(e);
    } finally {
      router.reload();
    }
  }

  return (
    <Grid container spacing={2} className={styles.exerciseWrapper}>
      <Grid item xs={12} md={9} className={styles.exerciseDisplayWrapper}>
        <h1>Exercise</h1>

        <DisplayList
          items={exercises}
          renderChild={(exercise) =>
            <ListItemExercise key={exercise.id} exercise={exercise} />
          }
        />
      </Grid>
      <Grid item xs={12} md={3}>
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
            {/* todo: look into Autocomplete -> Multiple Values -> freeSolo */}
            <Autocomplete
              multiple
              id="tags"
              options={tags}
              getOptionLabel={(option) => option?.tag}
              filterSelectedOptions
              value={selectedTags}
              freeSolo
              onChange={(evt, val) => {
                const tagsToBeAdded: TagType[] = [];
                val.forEach(async (item: string | TagType) => {
                  if(typeof item === 'string') {
                    const newTag = await addTag(item);
                    tagsToBeAdded.push(newTag);
                  } else {
                    tagsToBeAdded.push(item);
                  }
                });

                setSelectedTags(tagsToBeAdded);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tags"
                  placeholder="Tag your exercise..."
                />
              )}
            />
          </FormGroup>

          <Steps onStepsChanged={(stepsValues) => setSteps(stepsValues)} />

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
