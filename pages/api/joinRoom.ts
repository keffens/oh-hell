import { NextApiRequest, NextApiResponse } from "next";
import {
  authenticateUser,
  initFirebaseAdmin,
  handleError,
} from "../../lib/server_side";
import { MAX_PLAYERS, Room } from "../../lib/room";
import { getFirestore } from "firebase-admin/firestore";
import { User } from "../../lib/firebase";
import { JoinStatus } from "../../lib/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    initFirebaseAdmin();
    const { idToken, roomName } = await JSON.parse(req.body);
    const uid = await authenticateUser(idToken);
    const db = getFirestore();
    const roomDoc = db.doc(`rooms/${roomName}`);
    const gettingRoom = roomDoc.get();
    const user = (await db.doc(`users/${uid}`).get()).data() as User;
    const room = (await gettingRoom).data() as Room;
    const player = room.players.find((p) => p.uid === user.uid);
    if (!user.name) {
      res.status(200).json({ joinStatus: JoinStatus.MissingName });
    } else if (player) {
      if (player.name !== user.name) {
        player.name = user.name;
        await roomDoc.update(room);
      }
      res.status(200).json({ joinStatus: JoinStatus.Success });
    } else if (room.players.length >= MAX_PLAYERS) {
      res.status(200).json({ joinStatus: JoinStatus.RoomFull });
    } else {
      room.players.push({ uid, name: user.name });
      await roomDoc.update(room);
      res.status(200).json({ joinStatus: JoinStatus.Success });
    }
  } catch (e) {
    handleError(e, res);
  }
}
