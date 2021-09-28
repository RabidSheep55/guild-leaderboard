import nextConnect from "next-connect";
import dbMiddleware from "middleware/database";
import { returnCache, cacheResult } from "middleware/cache";

const handler = nextConnect();
handler.use(returnCache);
handler.use(dbMiddleware);

// Aggregation pipeline for the timedata collection
// Retrieves oldest and most recent data points for each player in the most flexible way possible
const agg = [
  { $unwind: { path: "$data" } },
  { $sort: { timestamp: 1 } },
  { $set: { "data.timestamp": "$timestamp" } },
  { $group: { _id: "$data.uuid", data: { $push: "$data" } } },
  { $project: { latest: { $last: "$data" }, oldest: { $first: "$data" } } },
  { $project: { "latest.uuid": 0, "oldest.uuid": 0 } },
];

handler.get(async (req, res, next) => {
  // Extract data, running through the aggregation pipeline
  const timedata = await req.db.collection("timedata").aggregate(agg).toArray();

  // Compute diffs for each player into new data array
  let data = [];
  timedata.forEach((item) => {
    data.push(
      Object.keys(item.latest)
        .filter((e) => e != "username" && e != "timestamp")
        .reduce(
          (acc, key) => ({
            ...acc,
            details: {
              ...acc.details,
              [key]: item.latest[key] - item.oldest[key],
            },
          }),
          {
            username: item.latest.username,
            timestamp: item.latest.timestamp,
            first_timestamp: item.oldest.timestamp,
            details: {},
          }
        )
    );
  });

  // Fetch event points distribution from the db
  const pointParams = await req.db
    .collection("point_params")
    .find(
      { enabled: true },
      { projection: { _id: 0, weight: 1, display_name: 1 } }
    )
    .toArray();

  // console.log(data);

  // Add points to each (and compute sum)
  let sum = 0;
  data.forEach((item) => {
    item.points =
      pointParams.reduce(
        (acc, cur) =>
          acc + (item.details[cur.display_name] || 0) * parseFloat(cur.weight),
        0
      ) || 0;
    sum += item.points;
  });

  console.log(sum);

  // Compute point % of totality for each user
  data.forEach((item) => {
    item.perc = item.points / sum;
  });

  // Sort by points
  data.sort((a, b) =>
    a.points <= b.points ? (a.points === b.points ? 0 : 1) : -1
  );

  // Add Rank
  data.forEach((item, ind) => {
    item.rank = ind + 1;
  });

  req.outputData = data;

  // Need to pass to the cacheResult middleware
  return next();
});

handler.use(cacheResult);

export default handler;
