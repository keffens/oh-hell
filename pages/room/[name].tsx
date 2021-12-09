import { doc, getFirestore, onSnapshot } from "@firebase/firestore";
import { CircularProgress, Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import Layout from "../../components/Layout";
import { initFirebase } from "../../lib/firebase";
import { Room } from "../../lib/room";

export default function RoomComponent() {
  const router = useRouter();
  const name = (router.query as { name: string }).name.trim().toUpperCase();
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
      <Container maxWidth="lg">
        {!room && !error && (
          <Stack>
            <CircularProgress sx={{ alignSelf: "center" }} />
          </Stack>
        )}
        {/* TODO: Add the room display here */}
        <ErrorAlert error={error} setError={setError} />
      </Container>
    </Layout>
  );
}
