// Code copied from https://www.mongodb.com/developer/how-to/nextjs-building-modern-applications/#connecting-next.js-to-mongodb-atlas
import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const client = new MongoClient(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/${process.env.MONGODB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

async function database(req, res, next) {
  if (!client.isConnected) await client.connect();
  req.dbClient = client;
  req.db = client.db(process.env.MONGODB_DATABASE);
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
