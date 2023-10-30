import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading, selectSetIsLoading} from '@app/store/selectors/globalStore';
import {useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {collectionUsers, firebaseAuth, firestoreDb} from '@app/services/firebase';
import {useRouter} from 'next/router';
import {useSession} from '@app/store/useSession';
import {selectSetUser} from '@app/store/selectors/session';
import {addDoc, collection, doc, getDoc, getDocs, limit, where} from '@firebase/firestore';
import {query} from '@firebase/database';

const fieldsInitialState = {
  email: '',
  password: '',
  cPassword: '',
};

const useAuth = () => {
  const router = useRouter();
  const setUser = useSession(selectSetUser);

  const isLoading = useGlobalStore(selectIsLoading);
  const setIsLoading = useGlobalStore(selectSetIsLoading);

  const [action, setAction] = useState<'login' | 'signup'>('login');
  const [fields, setFields] = useState(fieldsInitialState);

  const [errors, setErrors] = useState<string[]>([]);

  const onChange = (e) => {
    setFields(prevState => {
      return {
        ...prevState,
        [e.target.getAttribute('name')]: e.target.value
      }
    })
  }

  const onSubmit = () => {
    setIsLoading(true);
    if(action === 'login') {
      login();
    } else {
      signup();
    }
  }

  const login = async () => {
    try {
      let data;
      const response = await signInWithEmailAndPassword(firebaseAuth, fields.email, fields.password);
      const usersSnap = await getDocs(
        query(
          collection(firestoreDb, 'users'),
          where('email', '==', fields.email),
        )
      );

      usersSnap.forEach(user => {
        const userData: any = user.data();

        data = {
          ...userData,
          id: user.id
        }
      });

      setUser({
        ...response.user,
        ...(data as any)
      });

      setFields(fieldsInitialState)
      router.push('/');
    } catch (e) {
      setErrors(prevState => {
        prevState.push(e as string);
        return prevState;
      });
    } finally {
      setIsLoading(false);
    }
  }

  const signup = async () => {
    if(fields.password !== fields.cPassword) {
      errors.push('Passwords must match');
      setErrors(prevState => {
        if(!prevState.includes('Passwords must match, please try again')) {
          prevState.push('Passwords must match, please try again');
        }

        return prevState;
      });
      return;
    } else {
      setErrors([]);
    }

    try {
      const response = await createUserWithEmailAndPassword(firebaseAuth, fields.email, fields.password);
      const user = response?.user;

      if(user) {
        const userRef = await addDoc(collectionUsers, {
          email: fields.email,
          uid: user.uid
        });
      }

      router.reload();
    } catch (e) {
      setErrors(prevState => {
        prevState.push(e as string);
        return prevState;
      });
    } finally {
      setIsLoading(false);
    }
  }

  return {
    action,
    errors,
    setAction,
    isLoading,
    fields,
    onChange,
    onSubmit
  }
};

export default useAuth;
