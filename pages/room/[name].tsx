import { doc, getFirestore, onSnapshot } from "@firebase/firestore";
import { CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import Layout from "../../components/Layout";
import { initFirebase } from "../../lib/firebase";
import { normalizeRoomName, Room } from "../../lib/room";

export default function RoomComponent() {
  const router = useRouter();
  const name = normalizeRoomName((router.query as { name: string }).name);
  const [room, setRoom] = useState<Room | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name) return;
    initFirebase();
    const db = getFirestore();
    onSnapshot(doc(db, "rooms", name), (snapshot) => {
      if (!snapshot.data()) {
        setError("Failed to load room. Did you use the correct name?");
        return;
      }
      setRoom(snapshot.data() as Room);
    });
  }, [name]);

  if (!name) return <Layout />;

  return (
    <Layout title={`Room ${name}`}>
      {!room && !error && (
        <Stack>
          <CircularProgress sx={{ alignSelf: "center" }} />
        </Stack>
      )}
      {room?.players.map((player) => (
        <div key={player.uid}>{player.name}</div>
      ))}
      {/* TODO: Add the room display here */}
      <ErrorAlert error={error} setError={setError} />
    </Layout>
  );
}
