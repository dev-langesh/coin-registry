import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function AlertSection({
  setError,
  setMessage,
  error,
  message,
}: any) {
  const closeError = () => {
    setError((prev: any) => ({
      ...prev,
      open: false,
    }));
  };

  const closeMessage = () => {
    setMessage((prev: any) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <div>
      <Snackbar open={error.open} autoHideDuration={4000} onClose={closeError}>
        <Alert onClose={closeError} severity="error" sx={{ width: "100%" }}>
          {error.data}
        </Alert>
      </Snackbar>
      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={closeMessage}
      >
        <Alert onClose={closeMessage} severity="success" sx={{ width: "100%" }}>
          {message.data}
        </Alert>
      </Snackbar>
    </div>
  );
}
