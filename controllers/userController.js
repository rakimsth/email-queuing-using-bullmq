const User = require("../models/User");
const sendEmailCreationEmail = require("../mail/sendAccountCreationEmail");
const { addEmailToQueue } = require("../queue/queue");
exports.create = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = await User.create({
      name,
      email,
    });

    await sendEmailCreationEmail({ name, email });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.sendEmailToUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log({ users: users.length });
    if (users.length === 0) res.json({ msg: "No Users found..." });
    users.length > 0 &&
      users.forEach(async (user, index) => {
        await addEmailToQueue(user).then(() => {
          if (index + 1 === users.length) {
            res.json({ msg: "All users added to the queue." });
          }
        });
      });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
