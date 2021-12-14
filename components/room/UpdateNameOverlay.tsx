import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { useUser } from "../../lib/firebase";

export interface UpdateNameOverlayProps {
  joinRoom: () => void;
  isFirstJoin?: boolean;
}

export default function UpdateNameOverlay({
  joinRoom,
  isFirstJoin,
}: UpdateNameOverlayProps) {
  const [user, updateUser] = useUser();
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <Card
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={(event) => {
          joinRoom();
          event.preventDefault();
        }}
      >
        <CardContent>
          <TextField
            id="name"
            label="Name"
            placeholder="Enter your name"
            value={user.name ?? ""}
            onChange={(e) =>
              updateUser({ ...user, name: e.target.value.trimStart() })
            }
            inputProps={{ maxLength: 16 }}
          />
        </CardContent>
        <CardActions>
          <Button disabled={!user.name} type="submit">
            {isFirstJoin ? "join" : "update"}
          </Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
}
