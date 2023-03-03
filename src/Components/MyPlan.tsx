import React from "react";
import { Timeline, Text } from "@mantine/core";

function MyPlan() {
  return (
    <div style={{ width: 300 }}>
      <Timeline active={2} bulletSize={20} lineWidth={5}>
        <Timeline.Item title="Kantonsschule Frauenfeld">
          <Text color="dimmed" size="sm">
            Completed Swiss Matura with focus Law and Economics and thesis in
            Physics.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="ETH Zürich">
          <Text color="dimmed" size="sm">
            Requirements for BSc Computer Science satisfied.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Swiss Armed Forces">
          <Text color="dimmed" size="sm">
            In the Winter of 2023 I will complete my Swiss Army service.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="ETH Zürich">
          <Text color="dimmed" size="sm">
            Master Studies at ETH Zürich.
          </Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}

export default MyPlan;
