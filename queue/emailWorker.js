const Redis = require("ioredis");
const { Worker, QueueEvents } = require("bullmq");
const { redis } = require("./connection");
const sendEmailCreationEmail = require("../mail/sendAccountCreationEmail");

const emailQueueEvents = new QueueEvents("emailQueue", {
  connection: redis.duplicate(),
});

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    try {
      const { name, email } = job?.data;
      await sendEmailCreationEmail({ name, email });
    } catch (err) {
      throw err;
    }
  },
  {
    connection: redis.duplicate(),
  }
);

emailQueueEvents.on("completed", ({ jobId }) => {
  console.log("completed Job", { jobId });
});

emailQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.error("error", { jobId, failedReason });
});

module.exports = emailWorker;
