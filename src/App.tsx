import React from "react";
import {
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
  ColorScheme,
  Title,
  Grid,
  Col,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import AboutMe from "./Components/AboutMe";
import MyPlan from "./Components/MyPlan";
import Socials from "./Components/Socials";

function App() {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const theme = useMantineTheme();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <NotificationsProvider>
          <div
            style={{
              backgroundColor:
                colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[2],
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
            >
              <Title order={1} style={{ fontFamily: "HindMadurai, serif" }}>
                Michael Keller
              </Title>
            </div>
            <Grid style={{ margin: 0 }}>
              <Col
                span={12}
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <AboutMe />
              </Col>
              <Col
                span={12}
                md={6}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    justifyContent: "space-between",
                    padding: 20,
                    paddingTop: 40,
                  }}
                >
                  <MyPlan />
                  <Socials />
                </div>
              </Col>
            </Grid>
          </div>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
