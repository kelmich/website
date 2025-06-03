'use client';

import React from 'react';
import {
  useMantineTheme,
  useMantineColorScheme,
  Title,
  Grid,
  Col,
} from '@mantine/core';
import AboutMe from './components/AboutMe';
import MyPlan from './components/MyPlan';

export default function HomePage() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <div
      style={{
        backgroundColor:
          colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[2],
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Title order={1} style={{ fontFamily: 'HindMadurai, serif' }}>
          Michael Keller
        </Title>
      </div>
      <Grid style={{ margin: 0 }}>
        <Col
          span={12}
          md={6}
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <AboutMe />
        </Col>
        <Col
          span={12}
          md={6}
          style={{
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'left',
              justifyContent: 'space-between',
              padding: 20,
              paddingTop: 40,
            }}
          >
            <MyPlan />
          </div>
        </Col>
      </Grid>
    </div>
  );
}