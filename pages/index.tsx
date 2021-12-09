import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import Layout from "../components/Layout";
import LoadingOverlay from "../components/LoadingOverlay";
import { useUser, userIdToken } from "../lib/firebase/user";
import { Room, ROOM_NAME_LENGTH } from "../lib/room";

export default function Home() {
  const router = useRouter();
  const [user, updateUser] = useUser();
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function goToRoom(name: string) {
    router.push(`room/${name}`);
  }

  async function createRoom() {
    setLoading(true);
    const response = await fetch("api/createRoom", {
      method: "POST",
      body: JSON.stringify({ idToken: await userIdToken() }),
    });
    if (response.status !== 200) {
      setError(
        `${response.status} Failed to create room: ${response.statusText}`
      );
      setLoading(false);
      return;
    }
    const { name } = (await response.json()) as Room;
    goToRoom(name);
  }

  return (
    <Layout title="Lobby">
      <Container maxWidth="xs">
        <Stack spacing={2}>
          <Card sx={{ position: "relative" }}>
            <LoadingOverlay show={loading} />
            <CardContent>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  id="name"
                  label="Name"
                  placeholder="Enter your name"
                  value={user.name ?? ""}
                  onChange={(e) =>
                    updateUser({ ...user, name: e.target.value.trimStart() })
                  }
                  inputProps={{ maxLength: 16 }}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  id="room"
                  label="Room"
                  placeholder="Enter a room's id"
                  value={room}
                  onChange={(e) => setRoom(e.target.value.trim().toUpperCase())}
                  inputProps={{ maxLength: 6 }}
                  fullWidth
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                disabled={
                  loading || !user.name || room.length < ROOM_NAME_LENGTH
                }
                onClick={() => {
                  setLoading(true);
                  goToRoom(room);
                }}
              >
                Join room
              </Button>
              <Button disabled={loading || !user.name} onClick={createRoom}>
                Create room
              </Button>
            </CardActions>
          </Card>
          <ErrorAlert error={error} setError={setError} />
        </Stack>
      </Container>
    </Layout>
  );
}
