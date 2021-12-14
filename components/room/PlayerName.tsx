import { Link, Typography } from "@mui/material";
import { useState } from "react";
import { useUserId } from "../../lib/firebase";
import { Player } from "../../lib/room";
import UpdateNameOverlay from "./UpdateNameOverlay";

interface PlayerNameProps {
  player: Player;
  joinRoom: () => void;
}

export default function PlayerName({ player, joinRoom }: PlayerNameProps) {
  const [edit, showEdit] = useState(false);

  const uid = useUserId();
  if (uid === player.uid) {
    return (
      <>
        {edit && (
          <UpdateNameOverlay
            joinRoom={() => {
              joinRoom();
              showEdit(false);
            }}
          />
        )}
        <Typography>
          <Link onClick={() => showEdit(true)}>{player.name}</Link>
        </Typography>
      </>
    );
  }
  return <Typography>{player.name}</Typography>;
}
