import { Stack, Typography } from "@mui/material";
import { FC } from "react";

export const PageError: FC = () => (
  <Stack alignItems="center" justifyContent="center" height="100%" width="100%">
    <Typography color="error.main" variant="h3">
      Something has gone terribly wrong!
    </Typography>
  </Stack>
);
