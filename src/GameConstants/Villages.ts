import { Action } from "./Actions";

const Villages: Village[] = [
  {
    name: "Spring blossom village",
    description:
      "A tiny village in the fields. The villagers are poor, but kind and hardworking",
    imagePath: "village.png",
    actions: [
      {
        name: "Run Errands",
        description: "",
        result: { items: [{ type: "money", name: "Copper Coin", amount: 1 }] },
      },
      {
        name: "Use Training Grounds",
        description: "",
        result: { baseStats: { attack: 0.07, defence: 0.07 } },
      },
      {
        name: "Help in the fields",
        description: "",
        requiredTime: 10,
        result: {
          baseStats: { attack: 0.2, defence: 0.2 },
          items: [{ type: "money", name: "Copper Coin", amount: 5 }],
        },
      },
    ],
  },
];

type Village = {
  name: string;
  description: string;
  imagePath: string;
  actions?: Array<Action>;
};

export default Villages;
