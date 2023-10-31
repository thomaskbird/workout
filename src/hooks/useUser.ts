import {useSession} from '@app/store/useSession';
import {selectUser} from '@app/store/selectors/session';

const useUser = () => {
  const user = useSession(selectUser);

  return {
    favWorkouts: user.favWorkouts,
    favExercises: user.favExercises
  }
}

export default useUser;
