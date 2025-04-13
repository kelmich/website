import React from "react";
import {
  Timeline,
  Text,
  Card,
  Group,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { TbSchool } from "react-icons/tb";
import { TbBriefcase } from "react-icons/tb";
import { FiTool } from "react-icons/fi";

import Socials from "./Socials";

function MyPlan() {
  return (
    <div style={{ width: 300 }}>
      <Timeline active={2} bulletSize={30} lineWidth={0} color="blue">
        <Timeline.Item title="ETH Zürich" bullet={<TbSchool size={20} />}>
          <Text color="dimmed" size="sm">
            BSc Computer Science
          </Text>
        </Timeline.Item>

        <Timeline.Item title="DeepJudge AG" bullet={<TbBriefcase size={20} />}>
          <Text color="dimmed" size="sm">
            I currently work part time at DeepJudge, an ETH spinoff, as a
            Software Engineer.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Experience" bullet={<FiTool size={20} />}>
          <Text color="dimmed" size="sm">
            I have experience building modern web applications.
          </Text>
        </Timeline.Item>
      </Timeline>
      <Socials />
    </div>
  );
}

export default MyPlan;
