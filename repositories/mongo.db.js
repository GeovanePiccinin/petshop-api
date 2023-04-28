import mongoose from "mongoose";

async function connect() {
  const uri = process.env.MONGO_DB_STRING_CONNECTION;
  return await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export { connect };
