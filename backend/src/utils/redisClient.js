const { createClient } = require("redis");

const redis = createClient({ url: process.env.REDIS_URL });

redis.on("error", (err) => {
  console.error("Redis Client Error:", err);
});
(async () => {
  try {
    await redis.connect();
    console.log("Redis Connected");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

module.exports = redis;
