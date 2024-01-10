import redis from "redis";

export async function redisConnect() {
  if (global.redisClient) {
    return global.redisClient;
  }
  const redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Redis Error : ${error}`));
  global.redisClient = await redisClient.connect();
}

export async function getCached(req, res, next) {
  const redis_key = req.url;
  console.log(`trying to retrieve caching ${redis_key}`);
  let result;
  try {
    result = await redisClient.get(redis_key);
    if (result == null) {
      next();
    } else {
      res.status(200).json({
        message: `Success Read ${redis_key}`,
        data: JSON.parse(result),
      });
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
}

export async function caching(key, data) {
  console.log(`caching ${key}`);
  redisClient.set(key, JSON.stringify(data));
}

export async function delCache(key) {
  redisClient.del(key);
}

export async function disconnect() {
  redisClient.disconnect();
}
