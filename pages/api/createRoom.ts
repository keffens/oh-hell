import { NextApiRequest, NextApiResponse } from "next";
import {
  authenticateUser,
  initFirebaseAdmin,
  handleError,
} from "../../lib/server_side";
import { createRoom } from "../../lib/room";
import { getFirestore } from "firebase-admin/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    initFirebaseAdmin();
    const uid = await authenticateUser(req);
    const room = createRoom(uid);
    // TODO: Verify the generated room name does not exist yet.
    await getFirestore().doc(`rooms/${room.name}`).create(room);
    res.status(200).json(room);
  } catch (e) {
    handleError(e, res);
  }
};
