import { NextApiRequest, NextApiResponse } from "next";
import {
  authenticateUser,
  initFirebaseAdmin,
  handleError,
} from "../../lib/server_side";
import { generateRoom } from "../../lib/room";
import { getFirestore } from "firebase-admin/firestore";
import { User } from "../../lib/firebase";
import { verifyUser } from "../../lib/server_side/verification";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    initFirebaseAdmin();
    const uid = await authenticateUser(req);
    const db = getFirestore();
    const user = verifyUser(
      (await db.doc(`users/${uid}`).get()).data() as User
    );
    // TODO: Rooms older than a week (or a day?) should be overwritten.
    let room;
    let roomDoc;
    do {
      room = generateRoom(user);
      roomDoc = db.doc(`rooms/${room.name}`);
    } while ((await roomDoc.get()).exists);
    await roomDoc.create(room);
    res.status(200).json(room);
  } catch (e) {
    handleError(e, res);
  }
}
