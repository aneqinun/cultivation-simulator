import { Box, Typography } from "@mui/material";
import PlayerContext from "Context/PlayerContext/PlayerContext";
import React from "react";

export default function PlayerStatsPane() {
  const { stats } = React.useContext(PlayerContext);
  const { age, health, attack, defence } = stats;
  return (
    <Box>
      <Typography>Nameless Cultivator</Typography>
      <Typography>Age: {parsePlayerAge(age)}</Typography>
      <Typography>Hp: {health.toFixed(2)}</Typography>
      <Typography>Atk: {attack.toFixed(2)}</Typography>
      <Typography>Def: {defence.toFixed(2)}</Typography>
    </Box>
  );
}

// 70 years equals 1 hour
function parsePlayerAge(age: number): string {
  const yearSpan = 3600000 / 70;
  const monthSpan = yearSpan / 12;
  const years = Math.floor(age / yearSpan);
  // Just in case to not overflow 12 due to rounding
  const months = Math.min(Math.floor((age - years * yearSpan) / monthSpan), 12);
  return `${years} years ${months} months`;
}
