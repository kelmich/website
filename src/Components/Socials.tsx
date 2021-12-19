import React from "react";
import CSS from "csstype";
import { Text, Button, Group, useMantineTheme } from "@mantine/core";
import { FiGithub, FiGitlab, FiLinkedin } from "react-icons/fi";

function Socials() {
  const theme = useMantineTheme();

  const buttonStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "50px",
  };

  return (
    <div style={{ width: 300 }}>
      <Group
        position="apart"
        style={{ marginBottom: 20, marginTop: theme.spacing.sm }}
      >
        <Button
          variant="light"
          color="gray"
          onClick={() => window.open("https://github.com/kelmich")}
        >
          <div style={buttonStyle}>
            <FiGithub />
          </div>
        </Button>
        <Button
          variant="light"
          color="gray"
          onClick={() =>
            window.open("https://www.linkedin.com/in/michael-keller-396467209/")
          }
        >
          <div style={buttonStyle}>
            <FiLinkedin />
          </div>
        </Button>
        <Button
          variant="light"
          color="gray"
          onClick={() => window.open("https://gitlab.ethz.ch/kelmich")}
        >
          <div style={buttonStyle}>
            <FiGitlab />
          </div>
        </Button>
      </Group>
    </div>
  );
}

export default Socials;
