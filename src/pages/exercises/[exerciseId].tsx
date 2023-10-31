import {Grid} from '@mui/material';
import {NextPage} from 'next';
import styles from '@app/pages/exercises/index.module.scss';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import useExercises from '@app/hooks/useExercises';
import {ExerciseType} from '@app/types/types';

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
        <h1>Exercise</h1>

        {exercise && (
          <video controls>
            <source src={exercise?.video} type="video/mp4" />
          </video>
        )}

        <img src={exercise?.thumbnail} />
      </Grid>
      <Grid item xs={12} md={3}>
      </Grid>
    </Grid>
  )
}

export default ExerciseView;
