import { useColorMode, Switch, theme } from "@chakra-ui/react";

export const DarkModeSwitch: React.FC<{}> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Switch
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
