import {
  Box,
  CssBaseline,
  Paper,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import LightTheme from "Themes/LightTheme";

import PlayerLoader from "GameEngine/PlayerLoader";
import GameRuntime from "GameEngine/GameRuntime";
import TopBar from "Components/TopBar";
import useWindowDimensions, {
  getWindowDimensions,
} from "Utils/useWindowDimensions";
import MainNavigationBar from "Components/MainNavigationBar";
import WorldLoader from "GameEngine/WorldLoader";
import LeftSideBar from "Components/LeftSideBar";
import React from "react";
import getSpacing from "Utils/getSpacing";
import SettingsPage from "Components/SettingsPage";
import SettingsLoader from "GameEngine/SettingsLoader";

export default function App() {
  // Re-render page on innerWidth and innerHeight change
  useWindowDimensions();
  const { width, height } = getWindowDimensions();
  const [settings, setSettings] = React.useState<boolean>(false);
  const theme = useTheme();

  return (
    <CssBaseline>
      <ThemeProvider theme={LightTheme}>
        <SettingsLoader>
          <PlayerLoader>
            <WorldLoader>
              <GameRuntime>
                <Box width={width} height={height} overflow="hidden">
                  <TopBar setSettings={setSettings} />
                  {settings && <SettingsPage />}
                  {!settings && (
                    <Box display="flex">
                      <LeftSideBar />
                      <MainNavigationBar />
                    </Box>
                  )}
                </Box>
              </GameRuntime>
            </WorldLoader>
          </PlayerLoader>
        </SettingsLoader>
      </ThemeProvider>
    </CssBaseline>
  );
}
