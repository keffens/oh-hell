// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { initFirebaseAdmin } from "../../lib/firebase";
import { generateRoomName } from "../../lib/room";
import { getFirestore } from "firebase-admin/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  initFirebaseAdmin();
  console.log(req);
  const room = { name: generateRoomName() };
  const db = getFirestore();
  await db.doc(`rooms/${room.name}`).set(room);
  res.status(200).json({ room });
};
