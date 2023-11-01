import {Chip, Divider, Grid, Typography} from '@mui/material';
import {NextPage} from 'next';
import styles from '@app/pages/exercises/index.module.scss';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import useExercises from '@app/hooks/useExercises';
import {ExerciseStepType, ExerciseTagType, ExerciseType, TagType} from '@app/types/types';
import VideoPlayer from '@app/components/VideoPlayer/VideoPlayer';
import moment from 'moment/moment';
import config from '@app/config/sites';

type ExerciseViewProps = {};

const ExerciseView: NextPage<ExerciseViewProps> = ({}) => {
  const router = useRouter();
  const { retrieveExerciseById } = useExercises();

  const [exercise, setExercise] = useState<ExerciseType | undefined>(undefined);

  useEffect(() => {
    const retrieveExercise = async () => {
      const exerciseData = await retrieveExerciseById((router?.query?.exerciseId as string)!);
      setExercise(exerciseData);
    }


    if(router.isReady) {
      retrieveExercise();
    }
  }, [router])

  return (
    <Grid container spacing={2} className={styles.exerciseWrapper}>
      <Grid item xs={12} md={9} className={styles.exerciseDisplayWrapper}>
        <Typography variant="body2" color="text.secondary">Created by: {exercise?.userId}</Typography>
        <Typography variant="body2" color="text.secondary">Created on: {moment(exercise?.createdAt.toDate()).format(config.momentFormatWoTimestamp)}</Typography>

        {exercise && exercise?.video ? (
          <VideoPlayer
            url={exercise?.video}
            thumbnail={exercise?.thumbnail}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">No video found...</Typography>
        )}
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h4">{exercise?.title}</Typography>
        <Typography variant="body2" color="text.secondary">{exercise?.description}</Typography>
        {(exercise?.tags ?? []).map((tag: ExerciseTagType) => (
          <Chip key={tag.id} label={tag.tag} variant="outlined" style={{ marginRight: 10 }} />
        ))}

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h5">Steps:</Typography>
        <ol>
        {(exercise?.steps ?? []).map((exerciseStep: ExerciseStepType) => (
          <li key={exerciseStep.id}>{exerciseStep.val}</li>
        ))}
        </ol>

        <Divider style={{ margin: '20px 0' }} />
      </Grid>
    </Grid>
  )
}

export default ExerciseView;
