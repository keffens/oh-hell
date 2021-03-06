import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { initFirebase } from "./init";

export interface User {
  // If `uid` is not set, the user is not initialized yet.
  uid?: string;
  name?: string;
  hideCookiePopup?: boolean;
}

// Same as User but enforces uid and string to be set.
export interface VerifiedUser extends User {
  uid: string;
  name: string;
}

async function updateUser(db: Firestore, user: User) {
  if (!user.uid) {
    throw new Error("Cannot save a user without 'uid'");
  }
  await setDoc(doc(db, "users", user.uid), user);
}

export function useUser(): [User, (user: User) => void] {
  const [user, setState] = useState<User>({});
  useEffect(() => {
    initFirebase().then(() => {
      const db = getFirestore();
      const auth = getAuth();
      onAuthStateChanged(auth, async (u) => {
        if (!u?.uid) {
          setState({});
          throw new Error("Failed to log in");
        }
        const snapshot = await getDoc(doc(db, "users", u.uid));
        if (snapshot.data()?.uid) {
          setState(snapshot.data() as User);
        } else {
          updateUser(db, { uid: u.uid });
          setState({ uid: u.uid });
        }
      });
    });
  }, []);
  return [
    user,
    (u) => {
      updateUser(getFirestore(), u);
      setState(u);
    },
  ];
}

export function useUserId(): string | undefined {
  const [uid, setUid] = useState<string | undefined>();
  useEffect(() => {
    initFirebase().then(() =>
      onAuthStateChanged(getAuth(), (u) => setUid(u?.uid))
    );
  }, []);
  return uid;
}

export function userIdToken(): Promise<string> {
  const auth = getAuth();
  if (!auth.currentUser) {
    throw new Error("You are not logged in");
  }
  return auth.currentUser.getIdToken();
}
