import {useGlobalStore} from '@app/store/useGlobalStore';
import {selectIsLoading, selectSetIsLoading} from '@app/store/selectors/globalStore';
import {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential
} from "firebase/auth";
import Cookies from 'js-cookie';
import {collectionUsers, firebaseAuth, firestoreDb} from '@app/services/firebase';
import {useRouter} from 'next/router';
import {useSession} from '@app/store/useSession';
import {selectSetUser} from '@app/store/selectors/session';
import {addDoc, collection, getDocs, where} from '@firebase/firestore';
import {query} from '@firebase/database';
import {UserType} from '@app/types/types';

const provider = new GoogleAuthProvider();

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

  const findUserByEmail = async (email: string) => {
    let data;

    const usersSnap = await getDocs(
      query(
        collection(firestoreDb, 'users'),
        where('email', '==', email),
      )
    );

    usersSnap.forEach(user => {
      const userInfo: Partial<UserType> = user.data();

      data = {
        ...userInfo,
        id: user.id
      }
    });

    return data;
  }

  const handleSetUser = async (authData: UserCredential) => {
    const user = authData.user;

    const data = await findUserByEmail(user.email as string);

    // todo: determine if we need to set cookies
    // Cookies.set('user', JSON.stringify({
    //   ...authData.user,
    //   ...(data as any)
    // }));
    setUser({
      ...authData.user,
      ...(data as any)
    });
  }

  const createFirestoreUser = async (user: UserCredential) => {
    const email = user.user.email as string;
    const existingFirestoreUser = await findUserByEmail(email);

    if(!existingFirestoreUser) {
      return await addDoc(collectionUsers, {
        email: email,
        uid: user.user.uid
      });
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      const googleAuth = await signInWithPopup(firebaseAuth, provider);
      const createdFirestoreUser = await createFirestoreUser(googleAuth);
      await handleSetUser(googleAuth);

      router.push('/');
    } catch (e) {
      console.warn('Error:', e);
    } finally {
      setIsLoading(false);
    }
  }

  const onChange = (e: any) => {
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
      const response = await signInWithEmailAndPassword(firebaseAuth, fields.email, fields.password);
      await handleSetUser(response);

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
        const userRef = await createFirestoreUser(response);
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
    onSubmit,
    signInWithGoogle,
  }
};

export default useAuth;
