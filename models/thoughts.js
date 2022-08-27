const { Schema, model } = require("mongoose");

const ThoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    match: [/[0-9a-zA-Z]{1,280}/],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      if (date) return date.toISOString().split("T")[0];
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
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
    },
  ],
});

const Thoughts = model("thoughts", ThoughtsSchema);

module.exports = Thoughts;
