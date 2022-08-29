const { Schema, model } = require("mongoose");
//const { stringify } = require("uuid");

const UsersSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Email address not valid!"],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
  {
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reactions",
      },
    ],
  }
);

//friend count
UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create Users model using users schema
const Users = model("users", UsersSchema);

//export users model
module.exports = Users;
