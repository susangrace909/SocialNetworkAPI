const { Schema, model } = require("mongoose");
const { stringify } = require("uuid");

username: {
    type: string,
    unique
    required
    trimmed
}

email: {
    type: string,
    required
    unique
    must match valid email address (look up mongoose validating system)
}

thoughts: {
    array [] of _id values referencing thought model
}

friends: {
    array [] of _id values referencing user model (self-reference)
}

// create Users model using users schema
const Users = model('users', usersSchema);

//export users model
module.exports = Users;