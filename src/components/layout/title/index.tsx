import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import { Button, useTheme } from "@mui/material/";

import { logo, yariga, yarigaDark } from "../../../assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();
  let logoMode = useTheme().palette.mode === "dark" ? yarigaDark : yariga;

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logo} alt="Yariga" width="28px" />
        ) : (
          <img src={logoMode} alt="Yariga" width="140px" />
        )}
      </Link>
    </Button>
  );
};
