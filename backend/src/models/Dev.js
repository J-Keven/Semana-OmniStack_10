const mongoose = require('mongoose');
const PointSchema = require('./utils/poitSchema');

const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location:{
        type: PointSchema,
    },
});

module.exports = mongoose.model("Developer", DevSchema);