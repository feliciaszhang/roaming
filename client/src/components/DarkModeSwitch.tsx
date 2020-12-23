import { useColorMode, Switch } from '@chakra-ui/react'
import React, { InputHTMLAttributes, useEffect, useRef } from "react";

type DarkModeSwitchProps = InputHTMLAttributes<HTMLInputElement> & {
  handleToggleColor: (isDark:boolean) => void;
};

export const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({handleToggleColor}) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'

  useEffect(() => {
    handleToggleColor(isDark)
  })

  return (
    <Switch
      position="fixed"
      top="1rem"
      right="1rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  )
}
