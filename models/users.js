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
        ref: "Thoughts",
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
  {
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reactions",
      },
    ],
  }
);

//thought count
UsersSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.reduce((total, thoughts) => total + thoughts.replies.length +1, 0;);
});

//friend count
UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// create Users model using users schema
const Users = model("users", UsersSchema);

//export users model
module.exports = Users;
