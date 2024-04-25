const { Schema, model } = require("mongoose");

// Define the schema for individual videos
const VideoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
});

// Define el shema de playlist
const PlaylistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
    name: {
        type: String,
        required: true
    },
    videos: [VideoSchema],
       

});

module.exports = model("Playlist", PlaylistSchema);