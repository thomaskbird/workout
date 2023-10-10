import ExerciseDisplayItem from '@app/components/ExerciseDisplayItem/ExerciseDisplayItem';
import styles from './ExerciseDisplayList.module.scss';

type ExerciseDisplayListProps = {
  exercises: any;
};

const ExerciseDisplayList = ({ exercises }: ExerciseDisplayListProps) => {
  console.log('exercises', exercises);
  return (
    <div className={styles.root}>
      {exercises.map(exercise => (
        <ExerciseDisplayItem key={exercise.id} exercise={exercise} />
      ))}
    </div>
  )
}

export default ExerciseDisplayList;
