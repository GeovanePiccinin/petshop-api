import mongodb from "mongodb";

function getClient() {
  const uri = process.env.MONGO_DB_STRING_CONNECTION;
  return new mongodb.MongoClient(uri);
}

export { getClient };
