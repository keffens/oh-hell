import { Alert } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { JoinStatus } from "../../lib/api";
import UpdateNameOverlay from "./UpdateNameOverlay";

export interface JoinStatusAlertProps {
  status?: JoinStatus;
  setStatus: Dispatch<SetStateAction<JoinStatus | undefined>>;
  joinRoom: () => void;
}

export default function JoinStatusAlert({
  status,
  setStatus,
  joinRoom,
}: JoinStatusAlertProps) {
  if (status === JoinStatus.GameStarted || status === JoinStatus.RoomFull) {
    const message = JoinStatus.GameStarted
      ? "The game has already started."
      : "The maximum number of players has been reached.";
    return (
      <Alert
        severity="warning"
        onClose={() => setStatus(undefined)}
        sx={{ boxShadow: 1 }}
      >
        {message} You can watch but you cannot play.
      </Alert>
    );
  }
  if (status === JoinStatus.MissingName) {
    return <UpdateNameOverlay joinRoom={joinRoom} isFirstJoin />;
  }
  return null;
}
