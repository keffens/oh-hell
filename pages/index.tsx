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

export default function Home() {
  const [name, setName] = useState("");
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
                value={name}
                onChange={(e) => setName(e.target.value.trimStart())}
                inputProps={{ maxLength: 16 }}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="room"
                label="Room"
                placeholder="Enter a room's id"
                value={room}
                onChange={(e) => setRoom(e.target.value.trim())}
                inputProps={{ maxLength: 6 }}
                fullWidth
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button disabled={!name || !room}>Join room</Button>
            <Button disabled={!name}>Create room</Button>
          </CardActions>
        </Card>
      </Container>
    </Layout>
  );
}
