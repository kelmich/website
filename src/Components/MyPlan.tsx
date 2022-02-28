import React from "react";
import { Timeline, Text } from "@mantine/core";

function MyPlan() {
  return (
    <div style={{ width: 300 }}>
      <Timeline active={1} bulletSize={20} lineWidth={5}>
        <Timeline.Item title="Kantonsschule Frauenfeld">
          <Text color="dimmed" size="sm">
            Completed Swiss Matura with focus Law and Economics and thesis in
            Physics.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="ETH Zürich">
          <Text color="dimmed" size="sm">
            Currently in my 6th semester of my BSc in Computer Science.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Swiss Armed Forces" lineVariant="dashed">
          <Text color="dimmed" size="sm">
            In the Winter of 2023 I will complete my Swiss Army service.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Internship" lineVariant="dashed">
          <Text color="dimmed" size="sm">
            I'm looking for an Internship Opportunity in IT.
          </Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default MyPlan;
