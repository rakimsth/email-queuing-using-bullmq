const Redis = require("ioredis");

const connectionConfigs = {
  port: parseInt(process.env.REDIS_PORT) || 6379,
  host: process.env.REDIS_HOST || "localhost",
  password: process.env.REDIS_PASSWORD || "",
  user: process.env.REDIS_USER || "",
};

const redis = new Redis(connectionConfigs, { maxRetriesPerRequest: null });

module.exports = { redis };
