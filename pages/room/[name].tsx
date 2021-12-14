import { doc, getFirestore, onSnapshot } from "@firebase/firestore";
import { CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import Layout from "../../components/Layout";
import JoinStatusAlert from "../../components/room/JoinStatusAlert";
import PlayerName from "../../components/room/PlayerName";
import { callJoinRoom, JoinStatus } from "../../lib/api";
import { initFirebase } from "../../lib/firebase";
import { normalizeRoomName, Room } from "../../lib/room";

export default function RoomComponent() {
  const router = useRouter();
  const roomName = normalizeRoomName((router.query as { name: string }).name);
  const [room, setRoom] = useState<Room | undefined>();
  const [joinStatus, setJoinStatus] = useState<JoinStatus | undefined>();
  const [error, setError] = useState("");

  async function joinRoom() {
    const response = await callJoinRoom(roomName);
    setJoinStatus(response.joinStatus);
    if (response.errorMessage) setError(response.errorMessage);
  }

  useEffect(() => {
    if (!roomName) return;
    initFirebase().then(() => {
      const db = getFirestore();
      joinRoom();
      onSnapshot(doc(db, "rooms", roomName), (snapshot) => {
        if (!snapshot.data()) {
          setError("Failed to load room. Did you use the correct name?");
          return;
        }
        setRoom(snapshot.data() as Room);
      });
    });
  }, [roomName]);

  if (!roomName) return <Layout />;

  return (
    <Layout title={`Room ${roomName}`}>
      {!room && !error && (
        <Stack>
          <CircularProgress sx={{ alignSelf: "center" }} />
        </Stack>
      )}
      {room?.players.map((player) => (
        <PlayerName key={player.uid} player={player} joinRoom={joinRoom} />
      ))}
      {/* TODO: Add the room display here */}
      <JoinStatusAlert
        status={joinStatus}
        setStatus={setJoinStatus}
        joinRoom={joinRoom}
      />
      <ErrorAlert error={error} setError={setError} />
    </Layout>
  );
}
