import admin, { ServiceAccount } from "firebase-admin";
import { NextApiRequest } from "next";
import { HtmlError } from "./error";

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

export async function authenticateUser(req: NextApiRequest): Promise<string> {
  try {
    const { idToken } = await JSON.parse(req.body);
    const token = await admin.auth().verifyIdToken(idToken);
    return token.uid;
  } catch {
    throw new HtmlError(401, "Failed to authenticate the user");
  }
}
