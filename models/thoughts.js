const { Schema, model } = require("mongoose");

const ReactionsSchema: (
    {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280
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
  });

const ThoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
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
  toJSON: {
    getters: true
  }, 
});

const Thoughts = model("thoughts", ThoughtsSchema);

module.exports = Thoughts;
