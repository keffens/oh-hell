import admin, { ServiceAccount } from "firebase-admin";

const adminConfig: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

export function initFirebaseAdmin() {
  if (admin.apps?.length) return; // Only sign in once.
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
}
