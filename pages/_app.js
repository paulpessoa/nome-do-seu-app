import React from "react";
import { Container } from "@mui/material";

function MyApp({ Component, pageProps }) {
  return (
    <Container maxWidth="md" sx={{pt:2}}>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
