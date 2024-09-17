import React, { useContext } from "react";
import { useGetIdentity } from "@refinedev/core";


import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";


import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import { ColorModeContext } from "contexts";

export const Header: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity();
  const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.
  return shouldRenderHeader ? (
    <AppBar color="default" position="sticky" elevation={0} sx={{ bgcolor: "secondary.main" }}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
          gap={1}
        >
          <IconButton
            sx={{ background: "transparent" }}
            onClick={() => {
              setMode();
            }}
          >
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            {user?.avatar ? (
              <Avatar src={user?.avatar} alt={user?.name} />
            ) : null}
            {user?.name ? (
              <Typography variant="subtitle2">{user?.name}</Typography>
            ) : null}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  ) : null;
};
