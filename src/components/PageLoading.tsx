import { CircularProgress, Stack } from "@mui/material";
import { FC } from "react";

export const PageLoading: FC = () => (
  <Stack alignItems="center" justifyContent="center" height="100%" width="100%">
    <CircularProgress aria-label="data loading" id="data-loading" size={80} />
  </Stack>
);
