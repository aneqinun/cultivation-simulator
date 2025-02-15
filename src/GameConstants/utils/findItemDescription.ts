import { Herbs } from "GameConstants/Herbs";
import { ItemType } from "GameConstants/Interfaces";
import { Minerals } from "GameConstants/Minerals";
import Money from "GameConstants/Money";
import Treasures from "GameConstants/Treasures";

export default function findItemDescription(name: string, type: ItemType) {
  let description;
  if (type === "treasure")
    description = Treasures.find((item) => item.name === name);
  if (type === "money") description = Money.find((item) => item.name === name);
  if (type === "mineral")
    description = Minerals.find((item) => item.name === name);
  if (type === "herb") description = Herbs.find((item) => item.name === name);
  return description;
}
