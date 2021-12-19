import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { FiMoon, FiSun } from "react-icons/fi";

function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? (
        <FiSun style={{ width: 18, height: 18 }} />
      ) : (
        <FiMoon style={{ width: 18, height: 18 }} />
      )}
    </ActionIcon>
  );
}

export default ThemeSwitch;
