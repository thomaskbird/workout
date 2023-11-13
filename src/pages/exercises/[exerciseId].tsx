import BackButton from '@app/components/BackButton/BackButton';
import VideoPlayer from '@app/components/VideoPlayer/VideoPlayer';
import config from '@app/config/sites';
import useExercises from '@app/hooks/useExercises';
import styles from '@app/pages/exercises/index.module.scss';
import { ExerciseStepType, ExerciseTagType } from '@app/types/types';
import { Chip, Divider, Grid, Typography } from '@mui/material';
import moment from 'moment/moment';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

type ExerciseViewProps = {};

const ExerciseView: NextPage<ExerciseViewProps> = ({}) => {
  const router = useRouter();
  const { exerciseId } = router.query;
  const { exercise } = useExercises(exerciseId as string);

  return (
    <Grid container spacing={2} className={styles.exerciseWrapper}>
      <Grid item xs={12} md={9} className={styles.exerciseDisplayWrapper}>
        <BackButton />

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
