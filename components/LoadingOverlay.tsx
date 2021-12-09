import { CircularProgress, Stack } from "@mui/material";

export interface LoadingOverlayProps {
  show: boolean;
}

export default function LoadingOverlay({ show }: LoadingOverlayProps) {
  if (!show) return null;
  return (
    <Stack
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1000,
      }}
    >
      <CircularProgress sx={{ margin: "auto" }} />
    </Stack>
  );
}
