import React, { useEffect } from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import Socials from "./Socials";
import { FiGithub, FiLinkedin } from "react-icons/fi";

function AboutMe() {
  const theme = useMantineTheme();
  const notifications = useNotifications();

  useEffect(() => {
    setTimeout(
      () =>
        notifications.showNotification({
          title: "Welcome",
          message: "This website is still a work in progress, but have a look!",
        }),
      500
    );
  }, []);

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 20 }}>
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <Image
            src={require("../Assets/me-frontal.jpeg")}
            height={300}
            alt="Image of Michael Keller"
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>That's me</Text>
          <Group noWrap position="center">
            <ActionIcon
              variant="transparent"
              component="a"
              size="xs"
              title="Michael's Github"
              href="https://github.com/kelmich"
            >
              <FiGithub />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              component="a"
              size="xs"
              title="Michael's LinkedIn"
              href="https://www.linkedin.com/in/kelmich/"
            >
              <FiLinkedin />
            </ActionIcon>
            {/* <ActionIcon
          variant="hover"
          component="a"
          size="xl"
          title="Michael's ETH Gitlab"
          href="https://gitlab.ethz.ch/kelmich"
        >
          <FiGitlab />
        </ActionIcon> */}
          </Group>
        </Group>

        <Text
          size="sm"
          style={{ marginTop: 15, color: secondaryColor, lineHeight: 1.5 }}
        >
          I'm a student at ETH Zürich completing my Masters in Computer Science.
          My interests are in hard algorithmic problems and using computers to
          make my life easier.
        </Text>

        {/* <Button
          component="a"
          // variant="gradient"
          variant="light"
          color="blue"
          // gradient={{ from: "teal", to: "blue", deg: 60 }}
          fullWidth
          style={{ marginTop: 14 }}
          href="mailto:mail@kellermichael.com"
        >
          Get In Touch
        </Button> */}
      </Card>
    </div>
  );
}

export default AboutMe;
