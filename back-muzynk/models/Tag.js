const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    content: String
});

const tagModel = mongoose.model("Tag", tagSchema);
module.exports = tagModel;