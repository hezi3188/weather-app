import type { AppProps } from "next/app";
import { createTheme, MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import "@mantine/core/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({});
  return (
    <MantineProvider theme={theme}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
