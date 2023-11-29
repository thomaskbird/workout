import { firebaseAuth } from "@app/services/firebase";
import { selectSetUser, selectUser } from "@app/store/selectors/session";
import { useSession } from "@app/store/useSession";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = React.createContext(null);

const AuthContext = ({ children }: { children: any }) => {
  const router = useRouter();
  const userSessionData = useSession(selectUser);
  const setUserSessionData = useSession(selectSetUser);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // todo: need to also check the state user object.

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(firebaseAuth, async (user) => {
      try {
        if(user) {
          setUserSessionData({
            ...user,
            ...userSessionData
          });
        } else {
          setUserSessionData(null);
          router.push('/account');
        }
      } catch (err) {
        console.log('Error:', err);
      } finally {
        setLoading(false);
      }
    }); 

    return () => unsubscriber();
  }, []);

  useEffect(() => {
    if(!user && !userSessionData && router.asPath !== '/account') {
      router.push('/account');
      toast.error('You must be logged in to access those pages');
    }
  }, [router.isReady, router.asPath]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext);

export default AuthContext;