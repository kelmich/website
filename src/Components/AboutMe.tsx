import React from "react";
import {
  Card,
  Image,
  Text,
  Badge,
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
          <Badge color="green" variant="light">
            Available
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          I'm currently a student at ETH Zürich completing my Bachelors in
          Computer Science.
        </Text>

        <Button
          variant="light"
          color="blue"
          fullWidth
          style={{ marginTop: 14 }}
          onClick={() => window.open("mailto:mail@kellermichael.com")}
        >
          Get In Touch
        </Button>
      </Card>
    </div>
  );
}

export default AboutMe;
