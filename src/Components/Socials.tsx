import React from "react";
import CSS from "csstype";
import { ActionIcon, Group, useMantineTheme } from "@mantine/core";
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
        noWrap
        position="apart"
        style={{ marginBottom: 20, marginTop: theme.spacing.sm }}
      >
        <ActionIcon
          variant="light"
          component="a"
          size="xl"
          title="Michael's Github"
          href="https://github.com/kelmich"
        >
          <FiGithub />
        </ActionIcon>
        <ActionIcon
          variant="light"
          component="a"
          size="xl"
          title="Michael's LinkedIn"
          href="https://www.linkedin.com/in/michael-keller-396467209/"
        >
          <FiLinkedin />
        </ActionIcon>
        <ActionIcon
          variant="light"
          component="a"
          size="xl"
          title="Michael's ETH Gitlab"
          href="https://gitlab.ethz.ch/kelmich"
        >
          <FiGitlab />
        </ActionIcon>
      </Group>
    </div>
  );
}

export default Socials;
