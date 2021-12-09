import {
  Alert,
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
import Layout from "../components/Layout";
import { useUser, userIdToken } from "../lib/firebase/user";
import { Room, ROOM_NAME_LENGTH } from "../lib/room";

export default function Home() {
  const router = useRouter();
  const [user, updateUser] = useUser();
  const [room, setRoom] = useState("");
  const [error, setError] = useState("");

  function goToRoom(name: string) {
    router.push(`room/${name}`);
  }

  async function createRoom() {
    const response = await fetch("api/createRoom", {
      method: "POST",
      body: JSON.stringify({ idToken: await userIdToken() }),
    });
    if (response.status !== 200) {
      setError(
        `${response.status} Failed to create room: ${response.statusText}`
      );
      return;
    }
    const { name } = (await response.json()) as Room;
    goToRoom(name);
  }

  return (
    <Layout title="Lobby">
      <Container maxWidth="xs">
        <Stack spacing={2}>
          <Card>
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
                disabled={!user.name || room.length < ROOM_NAME_LENGTH}
                onClick={() => goToRoom(room)}
              >
                Join room
              </Button>
              <Button disabled={!user.name} onClick={createRoom}>
                Create room
              </Button>
            </CardActions>
          </Card>
          {error && (
            <Alert
              severity="error"
              onClose={() => setError("")}
              sx={{ boxShadow: 1 }}
            >
              {error}
            </Alert>
          )}
        </Stack>
      </Container>
    </Layout>
  );
}
