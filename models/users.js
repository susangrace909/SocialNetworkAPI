const { Schema, model } = require("mongoose");
//const { stringify } = require("uuid");

const usersSchema = new Schema ({
username: {
    type: String,
    unique
    required
    trimmed
}

email: {
    type: String,
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
});

// create Users model using users schema
const Users = model('Users', usersSchema);

//export users model
module.exports = Users;