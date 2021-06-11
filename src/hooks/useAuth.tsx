import React, {useContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {syncUser} from '../lib/storage';

const AuthContext = React.createContext({
  user: null as FirebaseAuthTypes.User | null,
  setUser: null as React.Dispatch<
    React.SetStateAction<null | FirebaseAuthTypes.User>
  > | null,
});

const useAuthProvider = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '192221113940-ndo786bekcb4crqvco5d0v4t0mv7fs31.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(newUser => {
      if (newUser) {
        syncUser(newUser.uid).then(() => {
          setUser(newUser);
        });

        // console.log(newUser.email, newUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    setUser,
  };
};

export const AuthProvider: React.FC = ({children}) => {
  const authContext = useAuthProvider();
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const signin = async () => {
  try {
    const {idToken} = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
  } catch (err) {
    throw new Error('cannot sign in');
  }
};

export const signout = async () => {
  try {
    await auth().signOut();
  } catch {
    throw new Error('cannot sign out');
  }
};
