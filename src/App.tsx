import React from "react";
import {
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
  ColorScheme,
  Title,
} from "@mantine/core";
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
        <div
          style={{
            backgroundColor:
              colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[2],
            width: "100%",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Title order={1} style={{ fontFamily: "HindMadurai, serif" }}>
              Michael Keller
            </Title>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <AboutMe />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "space-between",
                height: "auto",
                margin: 20,
                marginTop: 60,
              }}
            >
              <MyPlan />
              <Socials />
            </div>
          </div>
        </div>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
