const { Worker, QueueEvents } = require("bullmq");
const sendEmailCreationEmail = require("../mail/sendAccountCreationEmail");

const emailQueueEvents = new QueueEvents("emailQueue");

const emailWorker = new Worker("emailQueue", async (job) => {
  try {
    const { name, email } = job?.data;
    await sendEmailCreationEmail({ name, email });
  } catch (err) {
    throw err;
  }
});

emailQueueEvents.on("completed", ({ jobId }) => {
  console.log("completed Job", { jobId });
});

emailQueueEvents.on("failed", ({ jobId, failedReason }) => {
  console.error("error", { jobId, failedReason });
});

module.exports = emailWorker;
