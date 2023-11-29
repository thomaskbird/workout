import { firebaseAuth } from "@app/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserContext = React.createContext(null);

const AuthContext = ({ children }: { children: any }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(firebaseAuth, async (user) => {
      try {
        if(user) {
          console.log('useUserAuth() authenticated', user);
        } else {
          setUser(null);
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
    if(!user && router.asPath !== '/account') {
      router.push('/account');
      toast('You must be logged in to access those pages');
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