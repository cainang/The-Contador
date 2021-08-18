import React, { useEffect, useState, ReactNode, createContext } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Ring.module.scss";
import firebase from "../lib/firebase";

type User = {
  id: string | null;
  name: string | null;
  avatar: string | null;
};

type AuthContextType = {
  currentUser: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signUpNormal: (props: signUpNormalProps) => Promise<void>;
  loginNormal: (props: loginNormalProps) => Promise<void>;
  togglePending: () => void;
  logout: () => void;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type signUpNormalProps = {
  nome: string;
  email: string;
  senha: string;
};

type loginNormalProps = {
  email: string;
  senha: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [pending, setPending] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setPending(true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !uid) {
          throw new Error("Missing information from Google Account.");
        }

        setCurrentUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
      setPending(false);
    });
  }, []);

  async function signInWithGoogle() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();

      const result = await firebase.auth().signInWithPopup(provider);

      if (result.user) {
        const { displayName, photoURL, uid } = result.user;

        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }

        setCurrentUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    } catch (error) {
      alert(error);
    }

    router.push("/dashboard");
  }

  async function signUpNormal(props: signUpNormalProps) {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(props.email, props.senha)
        .then(async () => {
          await firebase.auth().currentUser?.updateProfile({
            displayName: props.nome,
          });

          router.push("/dashboard");
        });
    } catch (error) {
      alert(error);
    }
  }

  async function loginNormal(props: loginNormalProps) {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(props.email, props.senha);
    } catch (error) {
      alert(error);
    }

    router.push("/dashboard");
  }

  function logout() {
    firebase.auth().signOut();

    router.push("/");
  }

  function togglePending() {
    setIsHome(!isHome);
    console.log("oi");
  }

  if (pending) {
    return (
      <div className={styles.ring}>
        Carregando
        <span className={styles.spanlo}></span>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        signInWithGoogle,
        signUpNormal,
        loginNormal,
        togglePending,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
