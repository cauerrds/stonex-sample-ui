import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import { Header } from "../components/Header/Header";
import { ReduxProvider } from "../redux/provider/ReduxProvider";

export const metadata = {
  title: "Stonex Customer Manager",
  description: "PProject created to use in stonex job interview",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ReduxProvider>
          <MantineProvider theme={theme}>
            <Header/>
            {children}
          </MantineProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
