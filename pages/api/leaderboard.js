import nextConnect from "next-connect";
import middleware from "middleware/database";

// add caching middleware later https://www.npmjs.com/package/memory-cache

import pointsFunction from "utils/pointsFunction";

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  let startdata = await req.db.collection("startdata").findOne();

  // Construct an initValues dict to be able to query it more easily
  let initValues = {};
  startdata.data.forEach((block) => {
    initValues[block.username] = block;
  });

  // Get the last log document
  let data = await req.db
    .collection("timedata")
    .find({})
    .sort({ timestamp: -1 })
    .limit(1)
    .toArray();

  data = data[0];

  // Compute diffs
  data.data.map((item) => {
    // If we have this player in initValues
    // const isInit = item.username in initValues;
    for (const [key, value] of Object.entries(item)) {
      if (key != "username") {
        item[key] =
          parseFloat(value) - (initValues[item.username] || item)[key];
      }
    }
  });

  // Add points to each
  data.data.forEach((item) => {
    item.details = Object.keys(item)
      .filter((e) => e != "username")
      .reduce((acc, cur, ind) => [...acc, [cur, item[cur]]], []);
    item.points = pointsFunction(item) || 0;
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
