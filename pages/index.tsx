import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  TextField,
} from "@mui/material";
import { useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "../lib/firebase/user";

export default function Home() {
  const [user, updateUser] = useUser();
  const [room, setRoom] = useState("");

  return (
    <Layout title="Lobby">
      <Container maxWidth="xs">
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
            <Button disabled={!user.name || !room}>Join room</Button>
            <Button disabled={!user.name}>Create room</Button>
          </CardActions>
        </Card>
      </Container>
    </Layout>
  );
}
