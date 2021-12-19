import React from "react";
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  useMantineTheme,
} from "@mantine/core";

function AboutMe() {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 20 }}>
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <Image
            src={require("../Assets/me.jpg")}
            height={300}
            alt="Image of Michael Keller"
          />
        </Card.Section>

        <Group
          position="apart"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text weight={500}>That's me</Text>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          I'm currently a student at ETH Zürich completing my Bachelors in
          Computer Science.
        </Text>

        <Button
          component="a"
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
          fullWidth
          style={{ marginTop: 14 }}
          href="mailto:mail@kellermichael.com"
        >
          Get In Touch
        </Button>
      </Card>
    </div>
  );
}

export default AboutMe;
