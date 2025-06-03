'use client';

import React from 'react';
import { Text, Button, Card, Group, useMantineTheme, useMantineColorScheme } from '@mantine/core';

function Socials() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const secondaryColor =
    colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <Card shadow="sm" padding="lg" style={{ marginTop: 30 }}>
      <Group
        justify="flex-start"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text fw={500}>Have a question?</Text>
      </Group>

      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        Please feel free to shoot me an email
      </Text>

      <Button
        component="a"
        variant="light"
        color="blue"
        fullWidth
        style={{ marginTop: 14 }}
        href="mailto:mail@kellermichael.com"
      >
        Reach Out
      </Button>
    </Card>
  );
}

export default Socials;