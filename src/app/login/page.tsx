"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useLogin } from "@refinedev/core";
import { ThemedTitleV2 } from "@refinedev/mui";


export default function Login() {
  const { mutate: login } = useLogin();

  return (
    <Container
    sx={{backgroundColor:'#FCFCFC'}}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
       <div>
        <img src = {"images/yariga.svg"} alt="Refine Project"/>
        </div> 
        <Button
          style={{ width: "240px" }}
          variant="contained"
          size="large"
          onClick={() => login({})}
        >
          Sign in
        </Button>
        <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by
          <img
            style={{ padding: "0 5px" }}
            alt="Google"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
          />
          Google
        </Typography>
      </Box>
    </Container>
  );
}
