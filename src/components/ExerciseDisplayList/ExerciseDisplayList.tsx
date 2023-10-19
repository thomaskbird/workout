import ExerciseDisplayItem from '@app/components/ExerciseDisplayItem/ExerciseDisplayItem';
import styles from './ExerciseDisplayList.module.scss';
import {ExerciseType} from '@app/types/types';

type ExerciseDisplayListProps = {
  exercises: any;
};

const ExerciseDisplayList = ({ exercises }: ExerciseDisplayListProps) => {
  console.log('exercises', exercises);
  return (
    <div className={styles.root}>
      {exercises.map((exercise: ExerciseType) => (
        <ExerciseDisplayItem key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}

export default ExerciseDisplayList;
