const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    avatar: String,
    password: String,
    friendlist: [{
        type : Schema.Types.ObjectId,
        ref: "User"
    }],
    fil: [{
        type : Schema.Types.ObjectId,
        ref: "Feed"
    }],
    role: {
        type: String,
        enum: ["admin", "user", "moderator"],
        default: "user"
    },
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;