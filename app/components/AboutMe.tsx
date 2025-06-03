'use client';

import React, { useEffect } from 'react';
import {
  Card,
  Image,
  Text,
  Button,
  Group,
  useMantineTheme,
  useMantineColorScheme,
  ActionIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { FiGithub, FiLinkedin } from 'react-icons/fi';

function AboutMe() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    setTimeout(
      () =>
        notifications.show({
          title: 'Welcome',
          message: 'This website is still a work in progress, but have a look!',
        }),
      500
    );
  }, []);

  const secondaryColor =
    colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 20 }}>
      <Card shadow="sm" padding="lg">
        <Card.Section>
          <Image
            src="/me-frontal.jpeg"
            h={300}
            alt="Image of Michael Keller"
          />
        </Card.Section>

        <Group
          justify="space-between"
          style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        >
          <Text fw={500}>That's me</Text>
          <Group gap="xs" wrap="nowrap" justify="center">
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
      </Card>
    </div>
  );
}

export default AboutMe;