import React from "react";
import { Text, Button, Card, Group, useMantineTheme } from "@mantine/core";

function Socials() {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Card shadow="sm" padding="lg" style={{ marginTop: 30 }}>
      <Group
        position="left"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text weight={500}>Have a hard problem?</Text>
      </Group>

      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        I work freelance and love a challenge.
      </Text>

      <Button
        component="a"
        // variant="gradient"
        variant="light"
        color="blue"
        // gradient={{ from: "teal", to: "blue", deg: 60 }}
        fullWidth
        style={{ marginTop: 14 }}
        href="mailto:mail@kellermichael.com"
      >
        Request a quote
      </Button>
    </Card>
  );
}

export default Socials;
