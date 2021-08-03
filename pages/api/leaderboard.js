import nextConnect from "next-connect";
import middleware from "middleware/database";

import pointsFunction from "utils/pointsFunction";

const handler = nextConnect();
handler.use(middleware);

const data = {
  timestamp: 123,
  data: [
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "RabidSheep55",
      fishingXP: 12346,
      empKills: 234,
    },
    {
      username: "demonhunter990",
      fishingXP: 884,
      empKills: 1235,
    },
    {
      username: "Appable",
      fishingXP: 1233346,
      empKills: 12234235,
    },
    {
      username: "graciousTempest",
      fishingXP: 1234226,
      empKills: 123325,
    },
  ],
};

handler.get(async (req, res) => {
  // let doc = await req.db.collection("daily").findOne();
  // console.log(doc);
  //

  // Add points to each
  data.data.forEach((item) => {
    item.details = Object.keys(item)
      .filter((e) => e != "username")
      .reduce((acc, cur, ind) => [...acc, [cur, item[cur]]], []);
    item.points = pointsFunction(item);
  });

  // Sort by points
  data.data.sort((a, b) =>
    a.points <= b.points ? (a.points === b.points ? 0 : 1) : -1
  );

  // Add Rank
  data.data.forEach((item, ind) => {
    item.rank = ind + 1;
  });

  res.status(200).json(data);
});

export default handler;
