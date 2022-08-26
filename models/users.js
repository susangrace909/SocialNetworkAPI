const { Schema, model } = require("mongoose");
//const { stringify } = require("uuid");

const usersSchema = new Schema(
  {
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
        ref: "Thought",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

usersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create Users model using users schema
const Users = model("Users", usersSchema);

//export users model
module.exports = Users;
