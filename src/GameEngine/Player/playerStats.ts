import {
  InventoryItem,
  isInventoryTreasure,
  PlayerContextType,
  PlayerCultivationManual,
  PlayerStats,
} from "GameConstants/Player";

// Functions that calculate total player stats values based on inGame variables
export function playerHealth(player: PlayerContextType) {
  const cultivationMulti = manualsStatsMultiplier("health", player.manuals);
  const realmMulti = player.realm.power["health"] || 1;
  const treasuresPower = treasuresBonus("health", player.inventory);
  return (
    player.baseStats.health * realmMulti * cultivationMulti + treasuresPower
  );
}

export function playerAttack(player: PlayerContextType) {
  const cultivationMulti = manualsStatsMultiplier("attack", player.manuals);
  const realmMulti = player.realm.power["attack"] || 1;
  const treasuresPower = treasuresBonus("attack", player.inventory);
  return (
    player.baseStats.attack * realmMulti * cultivationMulti + treasuresPower
  );
}

export function playerDefence(player: PlayerContextType) {
  const cultivationMulti = manualsStatsMultiplier("defence", player.manuals);
  const realmMulti = player.realm.power["defence"] || 1;
  const treasuresPower = treasuresBonus("defence", player.inventory);
  return (
    player.baseStats.defence * realmMulti * cultivationMulti + treasuresPower
  );
}

export function playerHealthRegen(player: PlayerContextType) {
  const cultivationMulti = manualsStatsMultiplier(
    "healthRegen",
    player.manuals
  );
  const realmMulti = player.realm.power["healthRegen"] || 1;
  const treasuresPower = treasuresBonus("healthRegen", player.inventory);
  return (
    player.baseStats.healthRegen * realmMulti * cultivationMulti +
    treasuresPower
  );
}

export function playerInsight(player: PlayerContextType) {
  const cultivationMulti = manualsStatsMultiplier("insight", player.manuals);
  const realmMulti = player.realm.power["insight"] || 1;
  const treasuresPower = treasuresBonus("insight", player.inventory);
  return (
    player.baseStats.insight * realmMulti * cultivationMulti + treasuresPower
  );
}

// Returns all of the player stats
export function playerStats(player: PlayerContextType): PlayerStats {
  const stats = { ...player.stats };
  stats.health = playerHealth(player);
  stats.attack = playerAttack(player);
  stats.defence = playerDefence(player);
  stats.healthRegen = playerHealthRegen(player);
  stats.insight = playerInsight(player);
  // for current health to not overflow
  stats.currentHealth = Math.min(stats.currentHealth, stats.health);
  return stats;
}

// Calculates effect on player stats from manuals
export function manualsStatsMultiplier(
  stat: string,
  manuals: PlayerCultivationManual[] | undefined
) {
  // Calculate manuals multiplier
  let totalPower = 1;
  if (!manuals) return 1;
  manuals.forEach((value) => {
    try {
      if (!value.isEquipped || !value.manual.stats) throw new Error("skip");
      const manualPower =
        (value.manual.stats[stat] || 0) * value.learningProgress.level;
      totalPower += manualPower;
    } catch (error) {
      /* do nothing*/
    }
  });
  return totalPower;
}

// Treasures just provide flat bonuses for now
export function treasuresBonus(
  stat: string,
  treasures: InventoryItem[] | undefined
) {
  let totalBonus = 0;
  if (!treasures) return 0;
  treasures.forEach((item) => {
    if (isInventoryTreasure(item) && item.isEquipped) {
      const itemBonus = item.stats.stats[stat] || 0; // omg :)
      totalBonus += itemBonus;
    }
  });
  return totalBonus;
}

type StatStructure = {
  base: number;
  realm: number;
  manuals: number;
  treasures: number;
};

// Stat structure disambiguation for tooltips
export function getStatStructure(
  stat: string,
  player: PlayerContextType
): StatStructure {
  const { baseStats, realm, manuals, inventory } = player;
  const baseStat = baseStats[stat];
  const realmBonus = realm.power[stat] || 1;
  const manualsBonus = manualsStatsMultiplier(stat, manuals);
  const treasuresPower = treasuresBonus(stat, inventory);
  return {
    base: baseStat,
    realm: realmBonus,
    manuals: manualsBonus,
    treasures: treasuresPower,
  };
}
