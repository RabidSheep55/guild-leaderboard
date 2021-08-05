import nextConnect from "next-connect";
import dbMiddleware from "middleware/database";
import { returnCache, cacheResult } from "middleware/cache";

const handler = nextConnect();
handler.use(returnCache);
handler.use(dbMiddleware);

// Retrieve event details from the DB
handler.get(async (req, res, next) => {
  const pointParams = await req.db
    .collection("point_params")
    .find({ enabled: true }, { _id: 0 })
    .toArray();

  const eventInfo = await req.db
    .collection("event_info")
    .findOne({ active: true });

  const eventData = {
    pointParams,
    eventInfo,
  };

  req.outputData = eventData;

  // Need to pass to the cacheResult middleware
  return next();
});

handler.use(cacheResult);

export default handler;
