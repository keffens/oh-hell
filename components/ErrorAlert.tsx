import { Alert } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface ErrorAlertProps {
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

export default function ErrorAlert({ error, setError }: ErrorAlertProps) {
  if (!error) return null;
  return (
    <Alert severity="error" onClose={() => setError("")} sx={{ boxShadow: 1 }}>
      {error}
    </Alert>
  );
}
