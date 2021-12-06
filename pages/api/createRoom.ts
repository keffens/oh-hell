import { NextApiRequest, NextApiResponse } from "next";
import { initFirebaseAdmin } from "../../lib/server_side";
import { generateRoomName } from "../../lib/room";
import { getFirestore } from "firebase-admin/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  initFirebaseAdmin();
  const db = getFirestore();
  const room = { name: generateRoomName() };
  await db.doc(`rooms/${room.name}`).create(room);
  res.status(200).json({ room });
};
