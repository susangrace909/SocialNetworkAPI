const { Schema, model } = require("mongoose");

const ReactionsSchema = new Schema({
  reactionId: {
    id: true,
  },
  reactionBody: {
    type: String,
    required: true,
    match: [/[0-9a-zA-Z]{1,280}/],
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      if (date) return date.toISOString().split("T")[0];
    },
  },

  //!Connect to users?
});

const Reactions = model("reactions", ReactionsSchema);

module.exports = Reactions;
