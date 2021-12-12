import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import ErrorAlert from "../components/ErrorAlert";
import Layout from "../components/Layout";
import LoadingOverlay from "../components/LoadingOverlay";
import { callCreateRoom } from "../lib/api";
import { useUser } from "../lib/firebase/user";
import { MAX_ROOM_NAME_LENGTH, normalizeRoomName } from "../lib/room";

export default function Home() {
  const router = useRouter();
  const [user, updateUser] = useUser();
  const [roomName, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function goToRoom(name: string) {
    router.push(`room/${name}`);
  }

  return (
    <Layout title="Lobby" maxWidth="xs">
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
                value={roomName}
                onChange={(e) => setRoom(normalizeRoomName(e.target.value))}
                inputProps={{ maxLength: MAX_ROOM_NAME_LENGTH }}
                fullWidth
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button
              disabled={loading || !user.name || !roomName}
              onClick={() => {
                setLoading(true);
                goToRoom(roomName);
              }}
            >
              Join room
            </Button>
            <Button
              disabled={loading || !user.name}
              onClick={async () => {
                setLoading(true);
                const { room, errorMessage } = await callCreateRoom();
                if (room) {
                  goToRoom(room.name);
                  return;
                }
                if (errorMessage) setError(errorMessage);
                setLoading(false);
              }}
            >
              Create room
            </Button>
          </CardActions>
        </Card>
        <ErrorAlert error={error} setError={setError} />
      </Stack>
    </Layout>
  );
}
