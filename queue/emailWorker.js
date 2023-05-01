const Redis = require("ioredis");
const { Worker, QueueEvents } = require("bullmq");
const { connection } = require("./connection");
const sendEmailCreationEmail = require("../mail/sendAccountCreationEmail");

const emailQueueEvents = new QueueEvents("emailQueue");

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
    connection: new Redis(connection),
  }
);

emailQueueEvents.on("completed", ({ jobId }) => {
  console.log("completed Job", { jobId });
});

emailQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.error("error", { jobId, failedReason });
});

module.exports = emailWorker;
